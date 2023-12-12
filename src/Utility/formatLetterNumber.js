export default function formatLetterNumber(letterNumber) {
  // Split the input string into parts based on "/"
  const parts = letterNumber.split("/");

  // Extract the numeric part and pad it with leading zeros
  const numericPart = parts[0];
  const paddedNumericPart = numericPart.padStart(3, "0");

  // Update the original array with the padded numeric part
  parts[0] = paddedNumericPart;

  // Join the parts back together with "/"
  const formattedLetterNumber = parts.join("/");

  console.log(formattedLetterNumber);

  return formattedLetterNumber;
}
