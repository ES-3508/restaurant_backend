import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async(req,res)=>{
  const{email,password}=req.body;
  try{
    const user =await userModel.findOne({email});
    if(!user){
      return res.json({success:false,messagae:"User Dosen't exist"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.json({success:false,messagae:"Invalid credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true,token})

  } catch(error){
    console.log(error);
    res.json({success:false,messagae:"Error"})
  }

}

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) =>{
  const {name,password,email}=req.body;
  try{
    //checking is user already exists
    const exists =await userModel.findOne({email});
    if(exists){
      return res.json({success:false,messagae:"User alresdy exists"})
    }

    //validating email and strong pass word

    if(!validator.isEmail(email)){
      return req.json({success:false,messagae:"Please enter a valid email"})
    }

    if(password.length<8){
      return req.json({success:false,messagae:"Please enter strong password"})
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser =new userModel({
      name:name,
      email:email,
      password:hashPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})


    }catch(error)
  {
      console.log(error);
      res.json({success:false,messagae:"Error"})
  }

}

export {loginUser,registerUser}