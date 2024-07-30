const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Sign up
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/login.html");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret");
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/userbookings.html");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
