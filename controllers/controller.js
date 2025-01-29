const controllerForm = require("./controllerForm");
const controllerInput = require("./controllerInput");
const controllerOutput = require("./controllerOutput");
const controllerOpenAI = require("./controllerOpenAI");
const controllerCampaignList = require("./controllerCampaignList");

const formatCampaignText = require("./htmlTextFormater");

const db = require("../db/queries");

async function formGet(req, res) {
  res.render("campaignForm", {
    pageTitle: "Dungeon Co-Pilot - New Campaign",
    logoText: "AI Chat",
    userAvatar: "/images/avatar-placeholder.png",
    username: "John Doe",
    campaignList: await controllerCampaignList.getCampaignList(),
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

async function resultsGet(req, res) {
  const resultID = req.params.resultid;
  const results = await db.getResults(resultID);
  const outputText = formatCampaignText(results.rows[0].output)
  
  res.render("result", {
    pageTitle: "Dungeon Co-Pilot - Results ",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: await controllerCampaignList.getCampaignList(),
    campaignContent: outputText,
  });
}

async function allCampaignsGet(req, res) {
  const campaignList = await controllerCampaignList.getCampaignList()

  res.render("campaignFolder", {
    pageTitle: "Dungeon Co-Pilot - All Campaigns",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
  });
}

module.exports = {
  formGet,
  formPublish,
  resultsGet,
  allCampaignsGet
};
