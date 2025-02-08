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
  SELECT 
    campaign_outputs.* ,
    image_requests.task_id as image_task_id,
    image_responses.image_url as image_url
  FROM campaign_outputs 
    LEFT JOIN image_requests 
      ON campaign_outputs.campaign_id = image_requests.campaign_id
    LEFT JOIN image_responses
      ON image_requests.task_id = image_responses.task_id
  WHERE campaign_outputs.campaign_id = ($1)
  LIMIT 1`
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
  WITH tbHot AS (
    SELECT
      event_param->>'resultID' as campaign_id,
      count(distinct user_ip) as user_count
    FROM events
      WHERE date > CURRENT_DATE - INTERVAL '3 days'
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 3
  )
  SELECT 
    campaign_outputs.campaign_id, 
    campaign_name, 
    campaign_tagline, 
    created_at, 
    FLOOR(RANDOM() * 11) as likes, 
    false as isLiked,
    CASE WHEN tbHot.campaign_id IS NOT NULL THEN true ELSE false END as ishot
  FROM campaign_outputs 
    LEFT JOIN tbHot ON campaign_outputs.campaign_id = tbHot.campaign_id
    ${filterQuery}
    ORDER BY isHot DESC, created_at DESC LIMIT 30`
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