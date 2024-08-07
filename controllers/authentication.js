const user = require("../models/user");
const { genToken, authToken } = require("../middleware/jsonWebToken");
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json("Fill All The Field");
  }
  const userId = await user.findOne({ email: email });
  if (!userId) {
    return res.status(400).json("User Not Exits");
  }
  const isMatch = await userId.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json("Wrong Password");
  }
  const jwt = genToken(userId.id);
  return res.status(200).json(jwt);
};

const signup = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const idCard = req.body.idCard;
    const role = req.body.role;
    const phoneNo = req.body.phoneNo;
    const age = req.body.age;
    const password = req.body.password;
    if (
      !username ||
      !email ||
      !password ||
      !idCard ||
      !phoneNo ||
      !age ||
      !role
    ) {
      res.status(400).json("Fill All The Field");
    }
    const exitedUser = await user.findOne({
      $or: [
        { email: email },
        { name: username },
        { idCard: idCard },
        { phoneNo: phoneNo },
      ],
    });
    if (exitedUser) {
      res.status(400).json("User Already Exits");
    }
    const newUser = new user();
    newUser.name = username;
    newUser.password = password;
    newUser.email = email;
    newUser.idCard = idCard;
    newUser.age = age;
    newUser.role = role;
    newUser.phoneNo = phoneNo;
    newUser.jobType;
    const response = await newUser.save();
    const jwt = genToken(response.id);
    res.status(200).json(jwt);
  } catch (error) {
    res.status(400).json(error);
  }
};
const id = async (req, res) => {
  try {
    const userId = req.user;
    const profile = await user.findById(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req, res) => {
  try {
    const userId = req.user;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const jobType = req.body.jobType;
    const profile = await user.findById(userId);
    profile.name = username;
    profile.password = password;
    profile.email = email;
    profile.age = age;
    profile.jobType = jobType;
    const response = await profile.save();
    res.status(200).json("Profile Updated");
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { login, signup, id, update };
