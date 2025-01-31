const { Router } = require("express");
const userRouter = Router();
// const controller = require("../controllers/controller");
// const controllerForm = require("../controllers/controllerForm");

userRouter.get("/signup", (req, res) => res.render("authentication/signup"));

module.exports = userRouter;
