const controllerForm = require("./aux/controllerForm");
const parseJSONresults = require("./aux/parseJSONresults");
const auxFunc = require("../analytics/basicSessionInfo.js");
const controllerInput = require("./controllerInput");
const controllerOutput = require("./controllerOutput");
const controllerPromptProcessing = require("./promptProcessing/promptProcessing");
const promptTest = require("./promptProcessing/promptTest.js");
const controllerCampaignList = require("./aux/controllerCampaignList");
const analytics = require("../analytics/basicAnalytics");
const imgController = require("./imgGeneration/imgController.js")
const formQuestions = require("./auxForm/formQuestions.js")

const db = require("../db/queries");


async function homeGet(req, res){
  analytics.saveEvent(req, "viewHome")
  res.render("home")
}

async function formGet(req, res) {
  analytics.saveEvent(req, "viewForm", {source: req.query.source})

  res.render("campaignForm", {
    pageTitle: "Dungeon Co-Pilot - New Campaign",
    logoText: "AI Chat",
    userAvatar: "/images/avatar-placeholder.png",
    username: "John Doe",
    campaignList: await controllerCampaignList.getCampaignList(),
    questions: formQuestions.formQuestions
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

  // console.log(JSON.parse(results.rows[0].output).image_description)
  // console.log(JSON.parse(openAIResponse).image_description)
  imgController.generateImage(JSON.parse(openAIResponse).image_description, campaignid)

  res.redirect("results/" + campaignid);
}

async function resultsGet(req, res) {
  const resultID = req.params.resultid;
  const results = await db.getResults(resultID);
  analytics.saveEvent(req, "viewResult", eventParam = {resultID: resultID})

  // console.log(results.rows[0].image_url)

  res.render("result", {
    pageTitle: "Dungeon Co-Pilot - Results ",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    pageTitle: "All Campaigns",
    campaignList: await controllerCampaignList.getCampaignList(),
    campaignData: parseJSONresults(results.rows[0].output),
    campaignImage: results.rows[0].image_url,
  });
}

async function allCampaignsGet(req, res) {

  analytics.saveEvent(req,"viewCampaignFolder", {source: req.query.source})
  const campaignList = await controllerCampaignList.getCampaignList();

  res.render("campaignFolder", {
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
    pageTitle: 'Campaign List',
    pageDescription: 'Browse and create marketing campaigns with our intuitive platform',
    pageKeywords: 'campaigns, marketing, digital marketing, campaign creation',
    ogImage: 'https://yoursite.com/images/og-image.jpg',
    currentUrl: 'www.mydungeoncopilot.com'
  });
}

async function seachCampaignsGet(req, res) {
  analytics.saveEvent(req,"searchedCampaign", {search_term: req.query.search_term})
  // console.log("Search Term: " + req.query.search_term)
  const campaignList = await controllerCampaignList.getCampaignList(req.query.search_term);

  res.render("campaignFolder", {
    pageTitle: "Search: " + req.query.search_term,
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
  });
}

async function getGoogleAds(req, res) {
  analytics.saveEvent(req,"attGoogleAds")
  res.redirect("/")
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
  seachCampaignsGet,
  getGoogleAds
};



