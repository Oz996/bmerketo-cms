export const emptyFields = (
  dataObject: Record<string, string>,
  setState: any
) => {
  const emptyFieldValues = Object.entries(dataObject)
    .filter((item) => !item[1].trim())
    .map((item) => item[0]);

  const newErrors: Record<string, string> = {};
  emptyFieldValues.forEach((field) => {
    newErrors[field] = "This field is required";
  });

  if (emptyFieldValues.length > 0) {
    setState(newErrors);
    return true;
  }
  return false;
};
