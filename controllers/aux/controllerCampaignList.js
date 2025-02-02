const db = require("../../db/queries")

async function getCampaignList() {
  try {
  const campaignList = await db.getCampaignList()
  return campaignList.rows
}catch(err) {console.log(err)}
}

module.exports = {getCampaignList}