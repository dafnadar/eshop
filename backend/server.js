import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors()); // middleware hadle move between domains
app.use(express.json());  // middleware hadle jsons
app.use(express.urlencoded({ extended: true })); // middleware to support encoding

app.use('/api/v1/users', userRouter);
app.use('/api/v1/seed', seedRouter); 
app.use('/api/v1/products', productRouter); 
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("connected to DB");
  app.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}`);
  });
}).catch((err) => {
  console.log(`Failed to connect to mongoDB: ${err.message}`);
  console.error(err);
})