const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
/*
module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({"error": "No token provided"})
    }
    const parts = authHeader.split(' ');
    console.log(authHeader)
    if(!parts.length == 2)
        return res.send(401).send({"error":"Token error"})
        //Era para ter um Beare token...., mas so vem token
    //const [scheme, token] = parts;
    console.log(parts)
    const token =  parts[1];
    console.log(token)
    console.log(`SECRET : ${authConfig.secret}`);
    jwt.verify(token , authConfig.secret, (err, decoded)=>{
       // console.log(decoded)
        if(err) return res.status(401).send({"error":"Token invalid"});
        req.userId = decoded.id;
        return next();
    })
}
*/

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[0];
    //console.log(authToken);
    if (!authToken) return res.send('No token provied');
    jwt.verify(authToken, authConfig.secret, (err, data) => {
        //console.log(`ERROR: ${err}`);
        if (err) return res.status(401).send({"error": "Token invalid"});
        /*req.toke = authToken;
        req.user = {
            id: data.id,
            email: data.email
        }*/
        //console.log(data);
        req.userID = data.id;
        next();
    })
}