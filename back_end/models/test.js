

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },
  reponse: {
    type: String,
    required: true
  },
  category: {
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
  },
});

module.exports = mongoose.model("Music", QuestionSchema);