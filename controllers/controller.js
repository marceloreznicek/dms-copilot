const controllerForm = require("./aux/controllerForm");
const parseJSONresults = require("./aux/parseJSONresults");
const controllerInput = require("./controllerInput");
const controllerOutput = require("./controllerOutput");
const controllerPromptProcessing = require("./promptProcessing/promptProcessing");
const promptTest = require("./promptProcessing/promptTest.js");
const controllerCampaignList = require("./aux/controllerCampaignList");
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

async function formGenerateOneShot(req, res) {

  const formResponse = controllerForm.processFormResponse(req);
  console.log("Data treated");
  const campaignid = await controllerInput.handleCampaignSubmission(
    formResponse, req.ip
  );
  console.log("CampID: " + campaignid);
  const openAIResponse = await controllerPromptProcessing.generateCampaignResponse(formResponse, campaignid);
  console.log("OpenAI response received");
  await controllerOutput.handleCampaignOutput(
    campaignid,
    openAIResponse
  );
  console.log("Data ingested");

  res.redirect("results/" + campaignid);
}

async function resultsGet(req, res) {
  const resultID = req.params.resultid;
  const results = await db.getResults(resultID);

  res.render("result", {
    pageTitle: "Dungeon Co-Pilot - Results ",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: await controllerCampaignList.getCampaignList(),
    campaignData: parseJSONresults(results.rows[0].output),
  });
}

async function allCampaignsGet(req, res) {
  const campaignList = await controllerCampaignList.getCampaignList();

  res.render("campaignFolder", {
    pageTitle: "Dungeon Co-Pilot - All Campaigns",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
  });
}

async function controllerPromptTest(req, res) {
  await promptTest.testPrompt();
  res.end()
}

module.exports = {
  formGet,
  formGenerateOneShot,
  resultsGet,
  allCampaignsGet,
  controllerPromptTest
};




