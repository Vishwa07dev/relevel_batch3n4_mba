const authController = require('../controllers/auth.controller')

module.exports = (app)=>{
    app.post("/mba/api/v1/auth/signup", authController.signup)
    app.post("/mba/api/v1/auth/signin", authController.signin)
}