const mongoose = require('mongoose');

function connectToDatabase(url){
    mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(() => console.log('DB Connected!'))
        .catch(err => {
            console.log(`DB Connection Error: ${err}`);
        });
}

module.exports = connectToDatabase;
