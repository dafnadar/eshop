import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/v1/seed', seedRouter); 

app.use(cors());

//Endpoints
app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("connected to DB");
  app.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}`);
  });
}).catch((err) => {
  console.log(`Failed to connect to mongoDB: ${err.message}`);
})