const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Category name required']},
    products: [{type: Schema.Types.ObjectId, ref: 'product'}]
})

var Category = module.exports = mongoose.model('category', CategorySchema);

module.exports.findCategory = async (name)=>{
    try {
        const name_used = await Category.findOne({name});
        
        if (name_used) return true
        return false;
    } catch (error) {
        console.log(error);
        return true;
    }
}