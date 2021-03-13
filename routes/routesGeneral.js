const userRoutes = require('./user');
const adminRoutes = require('./admin');

function routesGeneral(app){
    app.use(userRoutes);
    app.use(adminRoutes);
}

module.exports = routesGeneral;