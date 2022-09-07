if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
module.exports = {
    SECRET:process.env.SECRET
}