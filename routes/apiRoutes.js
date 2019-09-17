let axios = require("axios");
let cheerio = require("cheerio");
let path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app, db) {

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


    app.post("/articles/:id", function (req, res) {
        console.log(req.params.id);


        db.Article.findOne({
            _id: req.params.id
        })
            .then(function (a) {
                res.json(a);
            })
            .catch(function (err) {
                console.log(err);
            });

    });


    app.get("/scrape", function (req, res) {

        db.Article.remove({}, function (err) {   //clear all old articles
            console.log("Error: " + err);
        });



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


                if ((title.length > 25) && (!title.toLowerCase().includes("drudge")))  // only save article if title's long 
                    results.push({
                        title: title,
                        link: link
                    });
            });

            db.Article.insertMany(results, function (err) {
                console.log(err);
            });

            res.sendFile(path.join(__dirname, '../public/main.html'))
        });
    });
}