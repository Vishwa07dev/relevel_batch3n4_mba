if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
module.exports = {
    CLIENT_REST_CALL : process.env.CLIENT_REST_CALL,
    companyEmail: process.env.COMPANY_EMAIL
}