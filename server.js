let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");

// Require all models
let db = require("./models");

let PORT = 3000;

// Initialize Express
let app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));


let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsdb";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/apiRoutes")(app, db);
require("./routes/htmlRoutes")(app);



// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
