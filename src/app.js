const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions.origin));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// routes
require("./routes/news.routes")(app);
require("./routes/calendars.routes")(app);

module.exports = app;
