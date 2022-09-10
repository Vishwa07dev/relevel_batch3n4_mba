const authController = require('../controllers/auth.controller')

module.exports = (app)=>{
    app.post("/crm/api/v2/auth/signup", authController.signup)
    app.post("/crm/api/v2/auth/signin", authController.signin)
}