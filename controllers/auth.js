const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtscret", {
  //   expiresIn: "30d",
  // });
  const token=user.createJWT();
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
  // res.send('register user');
};
const login = async (req, res) => {
   
  const {email,password}=req.body;
  if(!email ||!password){
    throw new BadRequestError('pls provide email and password')
  }
  const user=await User.findOne({email});


  if(!user)
  {
    throw new UnauthenticatedError('Invalid  user credentials');
  }

  //compare password;
  const isPasswordCorrect=await user.comparePassword(password);

  if(!isPasswordCorrect)
  {
    throw new UnauthenticatedError('Invalid  password credentials');
  }
  const token=user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name},token});
  res.send("login user");
};

module.exports = {
  register,
  login,
};
