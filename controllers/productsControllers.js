const Product = require('../models/Products');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Product has been created");
        } catch (error) {
            res.status(500).json("Failed to create product" + error);
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({createdAt: -1});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("Failed to get products" + error);
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("Failed to get product" + error);
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "furniture",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json("Failed to get products" + error);
        }
    }
}