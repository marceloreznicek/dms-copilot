const db = require("../db/queries");

// Example route handler
const handleCampaignSubmission = async (formResponse) => {
  try {
    payload = preparePayload(formResponse);
    const result = await db.insertFormData(payload);
    return result.rows[0].id ;
  } catch (error) {
    console.error("Error processing campaign submission:", error);
  }
};

const preparePayload = (formResponse) => {
  // Structure the data for database insertion
  const dbPayload = {
    user_id: 1,
    form_response: formResponse,
    open_ai_output: null,
    final_output: null,
  };

  return dbPayload;
};

module.exports = { handleCampaignSubmission };
