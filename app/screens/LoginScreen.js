import React, { useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppFormField,
  SubmitButton,
  AppForm,
} from "../components/forms";
import AppText from "../components/AppText";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const { login } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setSubmitting(true);
    const result = await authApi.login(email, password);
    setSubmitting(false);

    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    login(result.data);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <AppText style={styles.heading}>Welcome back</AppText>
        <AppText style={styles.hint}>
          Demo: mosh@domain.com / 12345
        </AppText>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid email or password"
            visible={loginFailed}
          />
          <AppFormField
            name="email"
            autoCapitalize="none"
            icon="email"
            placeholder="Email"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppFormField
            name="password"
            autoCapitalize="none"
            icon="lock"
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title={submitting ? "Logging in..." : "Login"} />
        </AppForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    padding: 20,
    ...Platform.select({
      web: {
        maxWidth: 420,
        width: "100%",
        alignSelf: "center",
      },
    }),
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  hint: {
    textAlign: "center",
    color: colors.medium,
    marginBottom: 16,
    fontSize: 14,
  },
});

export default LoginScreen;
