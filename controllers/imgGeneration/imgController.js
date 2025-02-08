const imgStorage = require("./imgStorage");
const imgGeneration = require("./imgGeneration");
const db = require("../../db/queries");

async function generateImage(prompt, campaign_id) {
  console.log("Generating Image")

  const taskID = await imgGeneration.requestImageGeneration(prompt);
  // console.log("ImgController >> taskID :" + taskID)

  db.insertData("image_requests", {
    campaign_id: campaign_id,
    task_id: taskID,
  });
}

async function handleWebhookResponseImage(req, res) {
  console.log("Webhook received")

  const imgStorageResponse = await imgStorage.uploadImage(req.body.payload.images[0].image_url);

  db.insertData("image_responses", {
    task_id: req.body.payload.task.task_id,
    image_url: imgStorageResponse.url,
  });
  
  res.end();

  console.log("Image generation done - Image ready for display")
}

module.exports = { generateImage, handleWebhookResponseImage };
