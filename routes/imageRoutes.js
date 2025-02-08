const { Router } = require("express");
const imageRouter = Router();
const imgController = require("../controllers/imgGeneration/imgController");

imageRouter.post("/image-complete", imgController.handleWebhookResponseImage);

module.exports = imageRouter;
