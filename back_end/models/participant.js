const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    
  full_name: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//   score: {
//     type: Number,
//   },
});

module.exports = mongoose.model("Participant", participantSchema);
