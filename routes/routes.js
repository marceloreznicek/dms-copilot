const { Router } = require("express");
const router = Router();
const userRouter = require("./userRoutes")

const controller = require("../controllers/controller");
const controllerForm = require("../controllers/aux/controllerForm");


router.get("/", (req, res) => res.redirect("/form"));

router.get("/form", controller.formGet);
router.post("/generate-one-shot", controller.formGenerateOneShot);

router.get("/results/:resultid", controller.resultsGet);
router.get("/campaigns", controller.allCampaignsGet);

router.use("/users", userRouter)

router.get("/test", controller.controllerPromptTest)



module.exports = router;
