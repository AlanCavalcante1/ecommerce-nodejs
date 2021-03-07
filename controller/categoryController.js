const Category = require('../models/category');

class categoryController{
    async create_category(req, res){
        const {name} = req.body.category;
        const used_category = await Category.findCategory(name);
        if(!used_category){
            const newCategory = new Category({
                name
            });
            newCategory.save().then(()=>{
                res.status(201).send({newCategory});
            }).catch(err=>{
                res.status(400).send({msg: err})
            })
        }else{
            res.status(400).send({msg: "Category name is already taken"})
        }
    }
}

module.exports = new categoryController();