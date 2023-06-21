import { useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

function FormImagePicker({ name, ...otherProps }) {
  const { errors, touched, setFieldValue, handleChange, values } =
    useFormikContext();
  const imageUris = values[name];
  const handleAddImage = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemoveImage = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
export default FormImagePicker;
