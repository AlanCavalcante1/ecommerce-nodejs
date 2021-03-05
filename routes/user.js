const express = require('express');
const router = express();
const UserSchema = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')
/*const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware)*/

router.post('/sign_up', async (req, res)=>{
    let {name, last_name, email, password, password_confirmation, address} = req.body.user;
    if(password != password_confirmation) res.status(400).json({err:'Password and Password confirmation are different'})
    const usedEmail = await UserSchema.findEmail(email);
    //console.log(usedEmail);
    if (!usedEmail){
        password = await UserSchema.hashPassword(password);
        const User = new UserSchema({
            name,
            last_name,
            email, 
            password,
            address
        });
        User.save().then(()=>{
            console.log("User Save");
            return res.status(201).send({User, 't': req.userId});
        }).catch(err =>{
            console.log(`Ocorreu um erro: ${err}`)
        });
    }else{
        return res.status(400).send({error:"this email is cadastred, please choose another email"});
    }
});

router.post('/login', async (req,res)=>{
    const {email, password} = req.body.user;
    const user = await UserSchema.getUserByEmail(email);
    console.log(user);
    if (user && email == user.email){
        //console.log(password);
        //console.log(user.password);
        const rigt_password = await bcrypt.compare(password, user.password);
        if (rigt_password){
            console.log(`SECRET : ${authConfig.secret}`);
            const token = jwt.sign({id: user.id}, authConfig.secret, {
                expiresIn: "24h" //it will be expired after 2 days
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