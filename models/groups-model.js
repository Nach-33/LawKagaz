const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      user : { 
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

const Group = mongoose.model("groups", groupSchema);
module.exports = Group;
