import mongoose from "mongoose";

export const connectDB = async ( )=>{
  (await mongoose.connect('mongodb+srv://nawodya:nawodya1234@cluster0.f8lkd.mongodb.net/food-del').then(()=>console.log("DB connected")));
}