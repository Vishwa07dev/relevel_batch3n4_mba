const authContoller = require('../controllers/auth.contoller');

module.exports = (app) =>{
    
    app.post("/mba/api/v1/auth/signup", authContoller.signup);

    app.post("/mba/api/v1/auth/signin", authContoller.signin);
    

}