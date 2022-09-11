const authController = require('../controllers/auth.controller')
const {userValid}=require("../middlewares/index")
module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup",[userValid.validateSignUpRequestBody], authController.signup)
    app.post("/mba/api/v1/auth/signin",[userValid.validateSignInRequestBody] ,authController.signin)
}