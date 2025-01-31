const db = require("../db/queries");

// Example route handler
const handleCampaignSubmission = async (formResponse, reqIP) => {
  try {
    payload = preparePayload(formResponse, reqIP);
    const result = await db.insertFormData(payload);
    return result.rows[0].id ;
  } catch (error) {
    console.error("Error processing campaign submission:", error);
  }
};

const preparePayload = (formResponse, reqIP) => {
  // Structure the data for database insertion
  const dbPayload = {
    user_id: 1,
    form_response: formResponse,
    open_ai_output: null,
    final_output: null,
    user_ip: reqIP
  };

  return dbPayload;
};

module.exports = { handleCampaignSubmission };
