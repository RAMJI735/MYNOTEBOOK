const express = require("express");
const router = express.Router();
const userModel = require("../schemas/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config()
const JWT_SECRET = process.env.SECRET;

router.post("/signup", async (req, res) => {
  //   console.log(req.body);
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
      console.log(salt)

    const hash = await bcrypt.hash(password, salt);
    console.log(hash);

    user = await userModel.create({
      name: name,
      email: email,
      password: hash,
    });
    console.log(user);

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "User account created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
 
    let user = await userModel.findOne({email:email});

    if(!user){
        return res.status(400).json({success:false,message:"Invalid Email or Password"})
    }

    console.log(user)

  let isVerify = await bcrypt.compare(password, user.password)
  if(isVerify){
    const token = jwt.sign({id:user._id}, JWT_SECRET)
    res.status(200).json({success:true,message:"Login Successfull",token:token})
  }
  else{
    return res.status(400).json({success:false,message:"Invalid Email or Password"})
  }

  } catch (error) {
    res.status(500).json({ seccess: false, message: "Internal Server Error", error: error });
  }
});

router.delete("/deleteaccount", async(req, res) => {
  const token = req.header('auth-token')
  const data = jwt.verify(token, JWT_SECRET)
  console.log(data.id)
  const user = await userModel.findByIdAndDelete(data.id)
  console.log(user)
  if(user){
    res.status(200).json({success:true,message:"Account Deleted Successfully"})
  }
  else{
    res.status(400).json({success:false,message:"user Not Found"})
  }
});

module.exports = router;
