const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//load database
const connectToDatabase = require('./database/connection');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
connectToDatabase(process.env.MONGODB_URL);

//configure routes
const routesGeneral = require('./routes/routesGeneral');
routesGeneral(app);

//listen to port
app.listen(process.env.PORT, ()=>{
    console.log("Server ligado")
})
