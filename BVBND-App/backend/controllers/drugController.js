const drugStore = require("../models/Drug");

//get all products
module.exports.allProducts = async (req, res) => {
    try {
        const allProducts = await drugStore.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get products detail
module.exports.getProdutcDetail = async (req, res) => {
        try{
            const { params } = req; 
            const product = await drugStore.findById(params.productId)
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }      
};