import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"


const foodRouter = express.Router();

// image storage Engine

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;