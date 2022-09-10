const userController = require('../controllers/user.controller');
 const {authJwt} = require('../middlewares')

module.exports = (app)=>{

    app.put("/crm/api/v1/users/:id", [authJwt.verifyToken, authJwt.isAdmin],userController.update)

}