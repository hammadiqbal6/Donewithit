import { Platform, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import { useState } from "react";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else setError("An unexpected error occurred.");
      return;
    }

    const loginResult = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    if (!loginResult.ok) {
      setError("Account created, but login failed. Try signing in.");
      return;
    }
    auth.login(loginResult.data);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <AppText style={styles.heading}>Create account</AppText>
          <Form
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage visible={!!error} error={error} />
            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" />
          </Form>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    padding: 10,
    ...Platform.select({
      web: {
        maxWidth: 420,
        width: "100%",
        alignSelf: "center",
        paddingTop: 40,
      },
    }),
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default RegisterScreen;
