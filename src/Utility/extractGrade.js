export default function extractGrade(inputString) {
  // Use a regular expression to extract the grade
  const match = inputString?.match(/[IVCDXL]+/);

  // Return the matched grade or null if not found
  return match ? match[0] : null;
}
