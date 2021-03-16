const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
      },

      reponse: {
        type: String,
        required: true
      },
});

module.exports = mongoose.model("formQuestion", formSchema);