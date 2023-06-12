const Manufacturer = require("../models/Manufacturer");
const Transporter = require("../models/Transporter");
const User = require("../models/User");
// Create a new Manufacturer document
// const manufacturerController = async (req, res) => {
//   try {
//     const { orderID, to, from, quantity, transporter, replyMessage } = req.body;
//     console.log(
//       "All data is : ",
//       orderID,
//       to,
//       from,
//       quantity,
//       transporter,
//       replyMessage
//     );
//     const { userId } = req.user;
//     console.log("user id is : ", userId);
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create the Manufacturer document
//     const manufacturer = new Manufacturer({
//       orderID,
//       to,
//       from,
//       quantity,
//       address: user.address,
//       transporter,
//       replyMessage,
//     });

//     await manufacturer.save();

//     // Populate the 'address' and 'transporter' fields with associated data
//     const populatedManufacturer = await Manufacturer.findById(manufacturer._id)
//       .populate("address")
//       .populate("transporter", "-replyMessage");

//     res.status(200).json({
//       message: "Manufacturer created successfully",
//       data: populatedManufacturer,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create Manufacturer", error });
//   }
// };
const manufacturerController = async (req, res) => {
  try {
    const { orderID, to, from, quantity, transporter, replyMessage } = req.body;

    console.log(
      "All data is:",
      orderID,
      to,
      from,
      quantity,
      transporter,
      replyMessage
    );

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch the user from the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the Manufacturer document
    const manufacturer = new Manufacturer({
      orderID,
      to,
      from,
      quantity,
      address: user.address,
      transporter,
      replyMessage,
    });

    await manufacturer.save();

    // Populate the 'address' and 'transporter' fields with associated data
    const populatedManufacturer = await Manufacturer.findById(manufacturer._id)
      .populate("address")
      .populate("transporter", "-replyMessage");

    res.status(200).json({
      message: "Manufacturer created successfully",
      data: populatedManufacturer,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Manufacturer", error });
  }
};

const fetchAllManufacturedata = async (req, res) => {
  try {
    const Manufacturerdata = await User.find();
    console.log("Manufacturer data : ", Manufacturerdata);
    const filterdata = Manufacturerdata.filter(
      (item) => item.role !== "Transporter"
    );
    res.status(200).json({
      success: true,
      data: filterdata,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Manufacturer", error });
  }
};

const fetchAllTransporterreply = async (req, res) => {
  try {
    const datatransporter = await Transporter.find().populate("orderID");
    res.status(200).json({
      success: true,
      data: datatransporter,
    });
  } catch (error) {
    console.log("Error message is : ", error.message);
  }
};

module.exports = {
  manufacturerController,
  fetchAllManufacturedata,
  fetchAllTransporterreply,
};
