const controllerForm = require("./controllerForm");
const controllerInput = require("./controllerInput");
const controllerOutput = require("./controllerOutput");
const controllerOpenAI = require("./controllerOpenAI");
const controllerSidebar = require("./controllerSidebar");

const formatCampaignText = require("./htmlTextFormater");

const db = require("../db/queries");

async function formGet(req, res) {
  res.render("campaign-form", {
    pageTitle: "New D&D Campaign Form",
    logoText: "AI Chat",
    userAvatar: "/images/avatar-placeholder.png",
    username: "John Doe",
    campaignList: await controllerSidebar.getCampaignList(),
  });
}

async function formPublish(req, res) {
  const formResponse = controllerForm.processFormResponse(req);
  console.log("Data treated");
  const campaignid = await controllerInput.handleCampaignSubmission(
    formResponse
  );
  console.log("CampID: " + campaignid);
  const openAIResponse = await controllerOpenAI.ProcessPrompt(formResponse);
  console.log("OpenAI response received");
  await controllerOutput.handleCampaignOutput(
    campaignid,
    openAIResponse.content
  );
  console.log("Data ingested");

  res.redirect("results/" + campaignid);
}

function indexGet(req, res) {
  res.render("index", {
    pageTitle: "AI Chat Application",
    logoText: "AI Chat",
    userAvatar: "/images/avatar-placeholder.png",
    username: "John Doe",
    campaignList: [
      { title: "Previous chat 1" },
      { title: "Previous chat 2" },
      { title: "Previous chat 3" },
    ],
    messages: [
      {
        type: "user",
        avatar: "U",
        content: "Hello! How can you help me today?",
      },
      {
        type: "assistant",
        avatar: "A",
        content:
          "Hi! I'm an AI assistant. I can help you with various tasks like writing, analysis, coding, and answering questions. What would you like to work on?",
      },
    ],
  });
}

async function resultsGet(req, res) {
  const resultID = req.params.resultid;
  const results = await db.getResults(resultID);
  const outputText = formatCampaignText(results.rows[0].output)
  
  res.render("result", {
    pageTitle: "Results for campaign " + resultID,
    logoText: "AI Chat",
    userAvatar: "/images/avatar-placeholder.png",
    username: "John Doe",
    campaignList: await controllerSidebar.getCampaignList(),
    campaignContent: outputText,
  });
}

module.exports = {
  indexGet,
  formGet,
  formPublish,
  resultsGet,
};
