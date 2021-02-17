const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'User name required']},
    last_name: {type: String, required: [true, 'Last name required']},
    email: {type: String, unique: true , lowercase: true, required: [true, 'Email required']},
    password: {type: String, required: [true, 'Password required']},
    address: String,
    createdAt: {type: Date, default: Date.now}
})


var User = module.exports = mongoose.model('user', UserSchema);
// // Eperson Away
// UserSchema.pre('save', async function(next) {
//     console.log("Entrou")
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
// });


// UserSchema.pre('save', async (next)=>{
//     //Nao funciona
//     const user = this;
//     console.log("VALIDACAO PRE");
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     console.log(user)
//     next();
// })

module.exports.hashPassword = async (password)=>{
    //console.log("VALIDACAO PRE");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //console.log(hash);
    return hash;
}

module.exports.findEmail = async (email)=>{
    try {
        const email_used = await User.findOne({email});
        //console.log(email_used);
        if(email_used) {
            //console.log("email achado")
            return true
        };
        return false;
    } catch (error) {
        console.log(error);
        return true;
    }
}

module.exports.getUserByEmail= async (email)=>{
    try {
        const user = await User.findOne({email});
        //console.log(`GetUSer ${user}`);
        return user;
    } catch (error) {
        return undefined
    }


}