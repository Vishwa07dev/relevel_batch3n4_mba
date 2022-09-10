const authcontroller = require("../controllers/auth.controller")


module.exports = (app) => {
    /**
     * POST for signUP
     */
    app.post("/mba/api/v1/auth/signup", authcontroller.signUp)

    /**
     * POST for signIn
     */
    app.post("/mba/api/v1/auth/signin", authcontroller.signIn);
}