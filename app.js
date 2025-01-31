const express = require("express")
const path = require("node:path");

const app = express()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));

// Make the static middleware more specific for js files
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use(express.static(path.join(__dirname, 'public')))

const router = require("./routes/routes")
app.use("/", router)

app.listen(3000, () => "We are live!")