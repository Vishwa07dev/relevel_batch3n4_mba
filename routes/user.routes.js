const userAuthController  = require("../controllers/user.controller");

module.exports = (app) => {
    app.post(
        "/mba/api/v1/auth/signup", 
        userAuthController.signup
    );
    
    app.post(
        "/mba/api/v1/auth/signin", 
        userAuthController.signin
    );
}