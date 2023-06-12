const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const UserSignupController = async (req, res) => {
  try {
    //fetch all data
    const { name, email, password, role, address } = req.body;
    //check user already exit in database or not
    console.log("data : ", name, email, password, role, address);
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already Exit Please login",
      });
    }

    //check password hashed or not
    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Password is not hashed",
      });
    }

    //create new User in db and return to the response

    const newUser = await User.create({
      name,
      email,
      password: hashpassword,
      role,
      address,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user login controller

const UserLogginController = async (req, res) => {
  try {
    //fetch the data in reqest body
    const { email, password } = req.body;
    //validation in check email and password are present are not
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill the email and Password ",
      });
    }
    //check the user present in db or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please signup account",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    //verify password & generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      //password match

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("jwttoken", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully ",
      });
    } else {
      //password do not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

module.exports = {
  UserSignupController,
  UserLogginController,
};
