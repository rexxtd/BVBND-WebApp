const Order = require("../models/Order");

//create an order
const createOrder =  async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

//update an order
const updateOrder =  async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order.userId === req.body.orderId) {
            await order.updateOne({ $set: req.body });
            res.status(200).json("the order has been updated");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// get all post
const getAllOrders = async(req, res) => {
    try{
        const allOrders = await Order.find();
        return res.status(200).json(allOrders);
    }
    catch(err){
        return res.status(500).json(err);
    }
}

//delete a post
const deleteOrder =  async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order.orderId === req.body.userId) {
            await order.deleteOne(); 
            res.status(200).json("the order has been deleted");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createOrder, updateOrder, getAllOrders, deleteOrder }