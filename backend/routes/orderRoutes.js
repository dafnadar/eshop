// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import Order from '../models/OrderModel.js';
// import User from '../models/UserModel.js';
// import Product from '../models/ProductModel.js';
// import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js';

// const orderRouter = express.Router();

// orderRouter.get(
//     '/',
//     isAuth,
//     isAdmin,
//     expressAsyncHandler(async (req, res) => {
//         const orders = await Order.find().populate('user', 'name');
//         res.send(orders);
//     })
// );

// // orderRouter.post(
// //     '/',
// //     isAuth,
// //     expressAsyncHandler(async (req, res) => {
// //         const newOrder = new Order({
// //             orderItems: req.body.orderItems.map((x) => ({...x, product: x_id})),
// //             shippingAddress: 
// //         })
// //     })
// //   );

// orderRouter.delete(
//     '/:id',
//     isAuth,
//     isAdmin,
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

// export default orderRouter;