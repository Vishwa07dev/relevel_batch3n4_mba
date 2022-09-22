const tokenController = require('../controllers/auth.controller');

module.exports = (app) =>{

    app.get("/mba/api/v1/refreshTokens/:refreshToken", tokenController.refreshToken);
    
}