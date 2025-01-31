// Load dotenv in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { OpenAI } = require("openai");

async function runPrompt(promptList, responseFormat, modelType = "gpt-4o-mini") {
  const apiKey = process.env.OPENAI_API_KEY;

  const openai = new OpenAI({
    // dangerouslyAllowBrowser: true,
    apiKey: apiKey,
  });

  const completion = await openai.chat.completions.create({
    model: modelType,
    store: true,
    messages: promptList, //[{ role: "user", content: prompt }]
    response_format: responseFormat,
  });

  return completion;
}

module.exports = { runPrompt };
