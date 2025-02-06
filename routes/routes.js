const { Router } = require("express");
const router = Router();
const userRouter = require("./userRoutes")

const controller = require("../controllers/controller");
const contFeedback = require("../controllers/controllerFeedback");


router.get("/", controller.allCampaignsGet);
router.get("/home", controller.allCampaignsGet);

router.get("/form", controller.formGet);
router.post("/generate-one-shot", controller.formGenerateOneShot);

router.get("/results/:resultid", controller.resultsGet);
router.get("/campaigns", controller.allCampaignsGet);
router.get("/campaigns/search", controller.seachCampaignsGet);

router.get("/feedback", contFeedback.getFeedback);
router.post("/feedback", contFeedback.postFeedback);

router.use("/users", userRouter)

router.get("/test", controller.controllerPromptTest)



module.exports = router;
