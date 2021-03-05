const express = require('express');
const router = express();
const UserSchema = require('../models/user');
const Address = require('../models/address');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')
const authMiddleware = require('../middlewares/auth');
//router.use(authMiddleware)*/

router.post('/sign_up', async (req, res)=>{
    let {name, last_name, email, password, password_confirmation} = req.body.user;
    if(password != password_confirmation) return res.status(400).json({err:'Password and Password confirmation are different'});
    const usedEmail = await UserSchema.findOne({email: email});
    console.log(usedEmail);
    if (!usedEmail){
        password = await UserSchema.hashPassword(password);
        const User = new UserSchema({
            name,
            last_name,
            email, 
            password
        });

        const {street, number, neighborhood, city, state} = req.body.user.address;
        const newAddress = new Address({
            street,
            number,
            neighborhood,
            city,
            state,
            user: User
        });

        User.address = newAddress;

        await User.save();
        await newAddress.save();

        //console.log(User);
        //console.log(newAddress);

        return res.status(201).json(User);
        //return res.status(201).send({User, 't': req.userId});       
    }else{
        return res.status(400).send({error:"this email is cadastred, please choose another email"});
    }
});

router.post('/login', async (req,res)=>{
    const {email, password} = req.body.user;
    const user = await (await UserSchema.getUserByEmail(email))//.populate('address')
    //console.log(user);
    if (user && email == user.email){
        const rigt_password = await bcrypt.compare(password, user.password);
        console.log(rigt_password);
        if (rigt_password){
            //console.log(`SECRET : ${authConfig.secret}`);
            const token = jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: "24h" //it will be expired after 1 days
            });
            return res.status(200).send({user, token});
        }
        else{
            return res.status(400).send({ msg: "email or password maybe are incorrect" })
        }
    }else{
        return res.status(400).send({ msg: "email or password maybe are incorrect" })
    }
});

router.get('/user/address', authMiddleware, async (req,res)=>{
    //console.log(req.userID);
    const User = await  UserSchema.findById({_id: req.userID}).populate('address');
    //console.log(User);
    const address = User.address;
    return res.status(200).json(address);
})

router.get('/user', async(req,res)=>{
    const Users = await UserSchema.find();
    return res.status(200).json(Users);
})

module.exports = router;

/*
, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }
*/