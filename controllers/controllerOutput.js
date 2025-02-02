const db = require("../db/queries");

// Example route handler
const handleCampaignOutput = async (campaignid, output) => {
  try {
    // console.log(campaignid)
    const campaignOutputs = extractAdventureDetails(output)
    const payload = generateOutputPayload(campaignid, output, campaignOutputs.campaignName, campaignOutputs.tagline);
    const result = await db.insertOutputData(payload);

    return result;
  } catch (error) {
    console.error("Failed to ingest campaign output", error);
  }
};

const generateOutputPayload = (campaignid, output, campaignName, campaignTagline) => {
  return {
    campaign_id: campaignid,
    output: output,
    campaign_name: campaignName,
    campaign_tagline: campaignTagline
  };
};

const extractAdventureDetails = (output) => {
  const regex = /"adventure_name":\s*"([^"]+)",\s*"tagline":\s*"([^"]+)"/;
  const match = output.match(regex);
  
  if (match) {
    return {
      campaignName: match[1], // Extracts "A Tide of Treachery"
      tagline: match[2] // Extracts "Unravel a conspiracy before the tide turns; time is running out!"
    };
  }

  return {
    campaignName: "Not found",
    tagline: "Not found"
  };
};

module.exports = {
  handleCampaignOutput,
};
