const { Router } = require("express");
const router = Router();
const userRouter = require("./userRoutes")

const controller = require("../controllers/controller");
const controllerForm = require("../controllers/aux/controllerForm");


router.get("/", controller.homeGet);
router.get("/home", controller.homeGet);

router.get("/form", controller.formGet);
router.post("/generate-one-shot", controller.formGenerateOneShot);

router.get("/results/:resultid", controller.resultsGet);
router.get("/campaigns", controller.allCampaignsGet);
router.get("/campaigns/search", controller.seachCampaignsGet);

router.use("/users", userRouter)

router.get("/test", controller.controllerPromptTest)



module.exports = router;
