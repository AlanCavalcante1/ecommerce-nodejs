const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    var authToken = req.headers['authorization']
    if (authToken) authToken=authToken.split(' ')[0];
    else return res.status(400).send("Você nao esta autenticado via token")
    //console.log(authToken);
    if (!authToken) return res.send('No token provied');
    jwt.verify(authToken, process.env.SECRET, (err, data) => {
        //console.log(`ERROR: ${err}`);
        if (err) return res.status(401).send({"error": "Token invalid"});
        /*req.toke = authToken;
        req.user = {
            id: data.id,
            email: data.email
        }*/
        //console.log(data);
        req.userID = data.id;
        req.userRole = data.role;
        next();
    })
}