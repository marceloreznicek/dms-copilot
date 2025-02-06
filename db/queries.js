const pool = require("./pool");

async function insertFormData(payload) {
  // Example query using node-postgres
  const query = `
        INSERT INTO campaign_requests (user_id, form_response, user_ip)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

  const values = [
    payload.user_id,
    payload.form_response,
    payload.user_ip
  ];

  const result = await pool.query(query, values);

  return result;
}

async function insertOutputData(payload) {
  const query = `
        INSERT INTO campaign_outputs (campaign_id, output, campaign_name, campaign_tagline)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;

  const values = [payload.campaign_id, payload.output, payload.campaign_name, payload.campaign_tagline];

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

async function getCampaignList(filter) {
  let filterQuery = ""
  if (filter !== "") {
    filterQuery = `WHERE lower(output) LIKE lower('%${filter}%')`
  }
  const query = `
  SELECT 
    campaign_id, 
    campaign_name, 
    campaign_tagline, 
    created_at, 
    FLOOR(RANDOM() * 11) as likes, 
    false as isLiked 
  FROM campaign_outputs 
    ${filterQuery}
    ORDER BY created_at 
    DESC LIMIT 20`
  const results = await pool.query(query)
  return results
}

async function insertData(table, dataObject) {

  // Sanitize table name to prevent SQL injection
  const sanitizedTable = table.replace(/[^a-zA-Z0-9_]/g, '');

  // Get field names and values from the object
  const fieldnames = Object.keys(dataObject);
  const values = Object.values(dataObject);

  // Sanitize field names
  const sanitizedFields = fieldnames.map(field => field.replace(/[^a-zA-Z0-9_]/g, ''));

  // Create the parameterized placeholders ($1, $2, etc.)
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

  const query = `
    INSERT INTO ${sanitizedTable} 
    (${sanitizedFields.join(', ')}) 
    VALUES (${placeholders})
    RETURNING id;
  `;

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    throw new Error(`Failed to insert data: ${error.message}`);
  }
}




module.exports = {
  insertFormData,
  insertOutputData,
  getResults,
  getCampaignList,
  insertData
};