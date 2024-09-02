import foodModel from "../models/foodModel.js";
import fs from 'fs'
// const FileService = require("../services/FileService.js");
import {FileService} from '../services/FileService.js'

//add food item

const addFood =async (req,res)=>{
  let image_filename='';
  const file = req.file;

  if (file) {
    const uploadResult = await FileService.uploadFile(req, res);
    console.log("uploadResult", uploadResult);

    if (uploadResult.error) {
      throw new Error(uploadResult.message);
    }
    image_filename = uploadResult.data.file_url;
  }


  const food =new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
  })
  try{
    await food.save();
    res.json({success:true,message:"Food Added"})
  }catch (error){
    console.log(error)
    res.json({success:false,message:"Error"})
  }

}

//all food list
const listFood =async(req,res) => {
  try{
    const foods = await foodModel.find({});
    res.json({success:true,date:foods})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
 
}

//remove food item
const removeFood = async (req,res) =>{
  try{
    // const food =await foodModel.findById(req.body.id);
    // fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Remove"})
  } catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})

  }

}

export {addFood,listFood,removeFood}