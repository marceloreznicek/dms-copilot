const express = require("express")
const path = require("node:path");

const app = express()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')))

const router = require("./routes/routes")
app.use("/", router)

app.listen(3000, () => "We are live!")