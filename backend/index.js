import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT;
const MONGODBURL = process.env.MONGODBURL;
const app = express();
app.use(cors({ credentials: true, origin:true }));
app.use(express.json());
mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error:${error}`);
  });
  const dishSchema = new mongoose.Schema({
    dishName: String,
    imageUrl: String,
    isPublished: Boolean
  });
  const dishCollection = mongoose.model('DishCollections', dishSchema);

  // API ENDPOINT to get all dishes @VSCODE Rahul
app.get('/api/dishes', async (req, res) => {
    try {
      res.json(await dishCollection.find());
    } catch (error) {
      res.send(error.message);
    }
  });
  //API ENDPOINT to toggle dishes @VSCODE RAHUL
  app.post('/api/dishes/:id/toggle', async (req, res) => {
    const dishId = req.params.id;
    try {
      const dish = await dishCollection.findById(dishId);
      dish.isPublished = !dish.isPublished;
      await dish.save();
      res.json(dish);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });