const Manufacturer = require("../models/Manufacturer");
const Transporter = require("../models/Transporter");
const User = require("../models/User");

// Create a new Transporter document
const transporterController = async (req, res) => {
  try {
    const { orderID, price, replyMessage } = req.body;
    // Create the Transporter document
    const transporter = new Transporter({
      orderID,
      price,
      replyMessage,
    });

    // Save the Transporter document
    await transporter.save();
    const userdata = await Transporter.find().populate("orderID");

    res
      .status(201)
      .json({ message: "Transporter created successfully", userdata });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Transporter", error });
  }
};

const fetchAllTransporter = async (req, res) => {
  try {
    const Manufacturerdata = await User.find();
    const filterdata = Manufacturerdata.filter(
      (item) => item.role !== "Manufacturer"
    );
    res.status(200).json({
      success: true,
      data: filterdata,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Manufacturer", error });
  }
};
const fetchAllManufacturerreply = async (req, res) => {
  try {
    const datatransporter = await Manufacturer.find()
      .populate({
        path: "address",
        model: "User",
      })
      .populate({
        path: "transporter",
        model: "User",
      });

    res.status(200).json({
      success: true,
      data: datatransporter,
    });
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

module.exports = {
  transporterController,
  fetchAllTransporter,
  fetchAllManufacturerreply,
};
