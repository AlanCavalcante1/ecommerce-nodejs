const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: {type:String,  trim: true,require: [true, 'Street name required']},
    number: {type: Number, required:[true, 'Number required']},
    neighborhood: {type:String,  trim: true,required:[true, 'Neighborhood name required']},
    city: {type:String, trim: true, required:[true, 'City name required']},
    state: {type:String, uppercase: true, required:[true, 'State name required']},
    user:{type: Schema.Types.ObjectId, ref: 'user'},
    createdAt: {type: Date, default: Date.now}
})

var Address = module.exports = mongoose.model('address', AddressSchema);