const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserLogin = require("../../model/auth/login");
const UserRegister = require("../../model/auth/register");

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  console.log("body detail ", req.body);
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    const userExists = await UserRegister.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserRegister({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    const user = await newUser.save();

    if (user) {
      return res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserRegister.findOne({ email });
    console.log("user: " + user);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "invalid credentails" });
    }
    res.json({ message: "Login user" });
  } catch (error) {}
};

module.exports = { registerUser, loginUser };
