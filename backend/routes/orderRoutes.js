import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
    '/',
    //isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find().populate('user', 'name');
        res.send(orders);
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order not found' });
        }
    })
);

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log(req);
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order created', order}); 
    })
  );

// orderRouter.delete(
//     '/:id',
//     isAuth,
//     expressAsyncHandler(async (req, res) => {
//         const order = await Order.findById(req.params.id);
//         if (order) {
//             await order.replaceOne(req, res);
//             res.send({ message: 'Order deleted successfully'});
//         } else {
//             res.status(404).send({ message: 'Order not found' });
//         }
//     })
// );

export default orderRouter;