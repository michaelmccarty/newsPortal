let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");

let axios = require("axios");
let cheerio = require("cheerio");

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

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsdb", { useNewUrlParser: true });




app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://drudgereport.com").then(function (response) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    let $ = cheerio.load(response.data);

    // An empty array to save the scraped data
    let results = [];


    $("b a").each(function (i, element) {
      let title = $(element).text();
      let link = $(element).attr("href");


      if (title.length > 25)   // only save article if title's long 
        results.push({
          title: title,
          link: link
        });
    });

    db.Article.insertMany(results, function (err) {
      console.log(err);
    });

    res.send("Scrape complete. results[0].title:  " + results[0].title);
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find()
    .then(function (a) {
      res.json(a);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  db.Article.findOne({
    _id: req.params.id
  })
    .then(function (a) {
      res.json(a);
    })
    .catch(function (err) {
      console.log(err);
    });
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
});


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
