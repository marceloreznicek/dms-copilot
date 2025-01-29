// Load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { OpenAI } = require("openai");
const prompt = require("./openaiPrompts/PromptCampaignCreation");
const apiKey = process.env.OPENAI_API_KEY;

async function ProcessPrompt(formData) {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey,
  });

  const readyPrompt = preparePrompt(prompt.campaignCreationPrompt, formData);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: readyPrompt }],
  });

  return completion.choices[0].message;
}

function preparePrompt(prompt, formData) {
  let modifiedPrompt = prompt;

  const formDataKeys = Object.keys(formData);
  formDataKeys.forEach((key) => {
    modifiedPrompt = modifiedPrompt.replace("[" + key + "]", formData[key]);
  });

  return modifiedPrompt;
}

module.exports = { ProcessPrompt };
