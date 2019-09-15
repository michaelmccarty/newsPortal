let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
let ArticleSchema = new Schema({
  // `title` must be of type String
  title: String,
  // `body` must be of type String
  link: String
});

// This creates our model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);

// Export the Note model
module.exports = Article;
