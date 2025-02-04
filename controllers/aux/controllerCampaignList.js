const db = require("../../db/queries")

async function getCampaignList(filter = "") {
  try {
  const campaignList = await db.getCampaignList(filter)
  return campaignList.rows
}catch(err) {console.log(err)}
}

module.exports = {getCampaignList}