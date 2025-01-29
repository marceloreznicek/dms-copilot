const pool = require("./pool");

async function insertFormData(payload) {
  // Example query using node-postgres
  const query = `
        INSERT INTO campaign_requests (user_id, form_response)
        VALUES ($1, $2)
        RETURNING id;
    `;

  const values = [
    payload.user_id,
    payload.form_response
  ];

  const result = await pool.query(query, values);

  return result;
}

async function insertOutputData(payload) {
  const query = `
        INSERT INTO campaign_outputs (campaign_id, output, campaign_name)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

  const values = [payload.campaign_id, payload.output, payload.campaign_name];

  const result = await pool.query(query, values);

  return result;
}

async function getResults(id) {
  const query = `
  SELECT * FROM campaign_outputs WHERE campaign_id = ($1)`
  const values = [id];
  const results = await pool.query(query, values)
  return results
}

async function getCampaignList() {
  const query = `
  SELECT campaign_id, campaign_name, created_at, FLOOR(RANDOM() * 11) as likes, false as isLiked FROM campaign_outputs ORDER BY created_at DESC LIMIT 20`
  const results = await pool.query(query)
  return results
}




module.exports = {
  insertFormData,
  insertOutputData,
  getResults,
  getCampaignList
};