import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/seed', seedRouter); 
// app.use('/api/v1/product/token/:token', (req, res) => {
//   const product = data.products.find(x => x.token === req.params.token);
//   if(product) {
//     res.send(product)
//   }
//   else {
//     res.status(404).send({message: 'Product was not found'});
//   }

// }); 


//Endpoints
app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/v1/product/token/:token', (req, res) => {
  const product = data.products.find(x => x.token === req.params.token);
  if(product) {
    res.send(product)
  }
  else {
    res.status(404).send({message: 'Product was not found'});
  }
}); 

app.get('/api/v1/products/:id', (req, res) => {
  const product = data.products.find(x => x._id === req.params._id);
  if(product) {
    res.send(product)
  }
  else {
    res.status(404).send({message: 'Product was not found'});
  }
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