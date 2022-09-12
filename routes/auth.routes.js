const authController = require('../controllers/auth.controller');
const authJwt = require('../middlewares');

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup",[authJwt.verifyToken], authController.signup);
    app.post("/mba/api/v1/auth/signin",[authJwt.verifyToken], authController.signin);
}