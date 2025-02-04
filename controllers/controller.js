const controllerForm = require("./aux/controllerForm");
const parseJSONresults = require("./aux/parseJSONresults");
const auxFunc = require("../analytics/basicSessionInfo.js");
const controllerInput = require("./controllerInput");
const controllerOutput = require("./controllerOutput");
const controllerPromptProcessing = require("./promptProcessing/promptProcessing");
const promptTest = require("./promptProcessing/promptTest.js");
const controllerCampaignList = require("./aux/controllerCampaignList");
const analytics = require("../analytics/basicAnalytics");
const db = require("../db/queries");


async function homeGet(req, res){
  analytics.saveEvent(req, "viewHome")
  res.render("home")
}

async function formGet(req, res) {
  analytics.saveEvent(req, "viewForm")

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
  analytics.saveEvent(req, "generateOneShot", eventParam = formResponse)
  user_ip = auxFunc.getClientIP()
  const campaignid = await controllerInput.handleCampaignSubmission(
    formResponse, req.ip
  );
  console.log("CampID: " + campaignid);
  const openAIResponse = await controllerPromptProcessing.generateCampaignResponse(formResponse, campaignid);
  await controllerOutput.handleCampaignOutput(
    campaignid,
    openAIResponse
  );

  res.redirect("results/" + campaignid);
}

async function resultsGet(req, res) {
  const resultID = req.params.resultid;
  const results = await db.getResults(resultID);
  analytics.saveEvent(req, "viewResult", eventParam = {resultID: resultID})

  res.render("result", {
    pageTitle: "Dungeon Co-Pilot - Results ",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    pageTitle: "All Campaigns",
    campaignList: await controllerCampaignList.getCampaignList(),
    campaignData: parseJSONresults(results.rows[0].output),
  });
}

async function allCampaignsGet(req, res) {
  analytics.saveEvent(req,"viewCampaignFolder")
  const campaignList = await controllerCampaignList.getCampaignList();

  res.render("campaignFolder", {
    pageTitle: "All Campaigns",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
  });
}

async function seachCampaignsGet(req, res) {
  analytics.saveEvent(req,"viewCampaignFolder", {search_term: req.query.search_term})
  console.log("Search Term: " + req.query.search_term)
  const campaignList = await controllerCampaignList.getCampaignList(req.query.search_term);

  res.render("campaignFolder", {
    pageTitle: "Search: " + req.query.search_term,
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
  homeGet,
  formGet,
  formGenerateOneShot,
  resultsGet,
  allCampaignsGet,
  controllerPromptTest,
  seachCampaignsGet
};



