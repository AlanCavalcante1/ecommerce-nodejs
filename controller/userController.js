const User = require('../models/user');
const Address = require('../models/address');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

class userController{
    async sign_up(req, res){
        let {name, last_name, email, password, password_confirmation, role} = req.body.user;
        if(password != password_confirmation) return res.status(400).json({err:'Password and Password confirmation are different'});
        const usedEmail = await User.findOne({email: email});
        if (!usedEmail){
            password = await User.hashPassword(password);
            const newUser = new User({
                name,
                last_name,
                email, 
                password,
                role
            });
    
            const {street, number, neighborhood, city, state} = req.body.user.address;
            const newAddress = new Address({
                street,
                number,
                neighborhood,
                city,
                state,
                user: newUser
            });
    
            newUser.address = newAddress;
    
            await newUser.save();
            await newAddress.save();
    
            return res.status(201).json(newUser);
            //return res.status(201).send({User, 't': req.userId});       
        }else{
            return res.status(400).send({error:"this email is cadastred, please choose another email"});
        }
    }

    async login(req, res){
        const {email, password} = req.body.user;
        const user = await User.getUserByEmail(email)//.populate('address')
        if (user && email == user.email){
            const rigt_password = await bcrypt.compare(password, user.password);
            if (rigt_password){
                const token = jwt.sign({id: user.id, role: user.role}, authConfig.secret, {
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
    }

    async address_from_user(req, res){
        //console.log(req.userID);
        const user = await  User.findById({_id: req.userID}).populate('address');
        const address = user.address;
        return res.status(200).json(address);
    }

    async show_users(req, res){
        if (req.userRole != 'admin') return res.status(403).send("Voce nao tem permissao para visualizar essa rota")
        const users = await User.find();
        return res.status(200).json(users);
    }

}

module.exports = new userController()