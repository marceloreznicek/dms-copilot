const db = require("../db/queries");

// Example route handler
const handleCampaignOutput = async (campaignid, output) => {
  try {
    // console.log(campaignid)
    const payload = generateOutputPayload(campaignid, output);
    const result = await db.insertOutputData(payload);

    return result;
  } catch (error) {
    console.error("Failed to ingest campaign output", error);
  }
};

const generateOutputPayload = (campaignid, output) => {
  return {
    campaign_id: campaignid,
    output: output,
    campaign_name: extractCampaignName(output)
  };
};

const extractCampaignName = (output) => {
  const regex = /"campaign_name":\s*"([^"]+)"/;
  const match = output.match(regex);
  let campaignName = "Not found";
  if (match) {
    campaignName = match[1]; // "Veil of Shadows"
  }
  return campaignName;
};

module.exports = {
  handleCampaignOutput,
};
