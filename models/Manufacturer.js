const mongoose = require("mongoose");

// Define the Manufacturer schema
const manufacturerSchema = new mongoose.Schema({
  orderID: {
    type: String,
    unique: true,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },

  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  replyMessage: {
    type: String,
    required: true,
  },
});
const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
module.exports = Manufacturer;
