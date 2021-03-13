const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const User = require('./models/user');
const Address = require('./models/address');
const Category = require('./models/category');
const Product = require('./models/product');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

var URL_of_mongodb = 'mongodb://localhost:27017/amazon'

mongoose.connect(URL_of_mongodb, {useUnifiedTopology: true, useNewUrlParser: true,})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err}`);
    });

app.get('/',(req,res)=>{
    res.send("teste");
})

app.use('/', userRoutes);
app.use('/', adminRoutes);

app.listen(3000, ()=>{
    console.log("Server ligado")
})
