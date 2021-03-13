const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//load database
const connectToDatabase = require('./database/database');

//routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
connectToDatabase(process.env.MONGODB_URL);

app.get('/',(req,res)=>{
    res.send("teste");
})

//set routes to use
app.use('/', userRoutes);
app.use('/', adminRoutes);

//listen to port
app.listen(process.env.PORT, ()=>{
    console.log("Server ligado")
})
