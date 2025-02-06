const prompts = require("./openaiPrompts/promptOneShot");
const openAI = require("./openAI");
const db = require("../../db/queries");

async function generateCampaignResponse(formData, campaignid) {

  const openAIPromptList = prompts.buildPromptList(formData)
  const openAIResponse = await openAI.runPrompt(openAIPromptList.promptList, openAIPromptList.jsonFormat, modelType= process.env.API_MODEL); //
  const promptCompiled = openAIPromptList.promptList.map((prompt) => prompt.message).join(",")


  await db.insertData("prompts", {
    campaign_id: campaignid,
    prompt_name: "OSV2",
    prompt: promptCompiled,
    output: openAIResponse.choices[0].message.content,
  });

  return openAIResponse.choices[0].message.content;
}



module.exports = { generateCampaignResponse };
