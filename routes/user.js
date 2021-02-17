const express = require('express');
const router = express();
const UserSchema = require('../models/user')
const bcrypt = require('bcryptjs');

router.post('/sign_up', async (req, res)=>{
    let {name, last_name, email, password, password_confirmation, address} = req.body.user;
    if(password != password_confirmation) res.status(400).json({err:'Password and Password confirmation are different'})
    const usedEmail = await UserSchema.findEmail(email);
    console.log(usedEmail);
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
            res.status(201).json({ message: 'user created' });
        }).catch(err =>{
            console.log(`Ocorreu um erro: ${err}`)
        });
    }else{
        res.status(400).json({error:"this email is cadastred, please choose another email"});
    }
});

router.post('/login', async (req,res)=>{
    const {email, password} = req.body.user;
    const user = await UserSchema.getUserByEmail(email);
    //console.log(`Login ${user}`)
    //res.send('Ok');

    if (user != null && email == user.email){
        bcrypt.compare(password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything
            if (data) {
                return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }
        })
    }else{
        return res.status(400).json({ msg: "email não confere" })
    }
});

module.exports = router;