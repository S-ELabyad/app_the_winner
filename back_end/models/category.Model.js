const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
  // category: {
  //   postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'categor(nom de table)'}
  // },
});

module.exports = mongoose.model("Category", categorySchema);