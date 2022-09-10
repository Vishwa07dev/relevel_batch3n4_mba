const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");



const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];
 
    if (!token) {
        return res.status(403).send({
            message: "No token provided ! Acccess prohibited"
        })
    }


    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorized !"
            });
        }
        req.userId = decoded.id;  
        next();
    })

}

const authJwt = {
    verifyToken: verifyToken,
};

module.exports = authJwt;