const userContoller = require('../controllers/user.contoller');
const {authJwt} = require('../middlewares');
module.exports = (app) =>{
    
    app.put("/mba/api/v1/auth/:id",[authJwt.verifyToken, authJwt.isAdmin], userContoller.verifyOwner);
    
}