const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const controllerForm = require("../controllers/controllerForm");

router.get("/", (req, res) => res.redirect("/form"));
router.get("/form", controller.formGet);

router.get("/form-publish", controller.formPublish);
router.get("/results/:resultid", controller.resultsGet);

module.exports = router;
