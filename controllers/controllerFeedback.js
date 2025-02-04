const analytics = require("../analytics/basicAnalytics");
const controllerCampaignList = require("./aux/controllerCampaignList");

async function getFeedback(req, res) {
  analytics.saveEvent(req, "viewFeedback");
  const campaignList = await controllerCampaignList.getCampaignList();

  res.render("feedback", {
    pageTitle: "Feedback is always welcome",
    userAvatar: "/images/avatar-placeholder.png",
    username: "User",
    campaignList: campaignList,
  });
}

async function postFeedback(req, res) {
  analytics.saveEvent(req, "postFeedback", {
    email: req.body.email,
    rating: req.body.rating,
    comments: req.body.comments,
  });
  res.redirect("/")
}

module.exports = { getFeedback, postFeedback }; //
