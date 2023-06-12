const mongoose = require("mongoose");

// Define the Transporter schema
const transporterSchema = new mongoose.Schema({
  orderID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],

  price: {
    type: Number,
    required: true,
  },
  replyMessage: {
    type: String,
    required: true,
  },
});
const Transporter = mongoose.model("Transporter", transporterSchema);

module.exports = Transporter;
