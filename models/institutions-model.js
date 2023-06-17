const mongoose = require("mongoose");

const institutionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
      },
      admin: {
        type: Boolean,
        default: false
      }
    },
  ],
  creationTimestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Institution = mongoose.model("institutions", institutionSchema);
module.exports = Institution;
