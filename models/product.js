const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Product name required']},
    category:{type: Schema.Types.ObjectId, ref: 'category'}
})

var Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.findProduct = async (name)=>{
    try {
        const name_used = await Product.findOne({name});
        
        if (name_used) return true
        return false;
    } catch (error) {
        console.log(error);
        return true;
    }
}