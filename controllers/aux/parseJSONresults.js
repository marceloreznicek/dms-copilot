function cleanAndParseJSON(outputText) {
  // Remove markdown code block markers and any whitespace around them
  const cleanText = outputText
    .replace(/```json\s*/g, '')  // Remove opening ```json
    .replace(/```\s*$/g, '')     // Remove closing ```
    .trim();                     // Remove any extra whitespace
    
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.log('Attempted to parse text:', cleanText);
    throw error;
  }
}

module.exports = cleanAndParseJSON