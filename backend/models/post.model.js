const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "UsersOfCarParts",
  },
  partName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  locationLat: {
    type: String,
  },
  locationLng: {
    type: String,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PostOfCarParts", NoteSchema);
