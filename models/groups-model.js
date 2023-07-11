const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      type: Object,
      user : { 
        type: mongoose.Schema.Types.ObjectId,
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
