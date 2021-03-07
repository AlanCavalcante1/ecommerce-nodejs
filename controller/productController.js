const Product = require('../models/product');
const Category = require('../models/category');

class productController{
    async create_product(req, res){
        const categoryId = req.body.product.category;
        const category = await Category.findById({_id: categoryId});
        const {name} = req.body.product;
        const used_product = await Product.findProduct(name);
        if(!used_product){
            const newProduct = new Product({name, img: req.file.filename});
            newProduct.category = category;
            await newProduct.save();
            category.products.push(newProduct);
            await category.save();
    
            res.status(201).json(newProduct);
        }
    }

    async show_product(req, res){
        const {productId} = req.params;
        const product = await Product.findById({_id: productId}).populate('category', 'name');
        res.status(200).json({product});
    }
}

module.exports = new productController()