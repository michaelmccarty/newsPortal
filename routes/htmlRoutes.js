let path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {


  app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/main.html'))
    //res.redirect('../main.html');
  })


  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

}
