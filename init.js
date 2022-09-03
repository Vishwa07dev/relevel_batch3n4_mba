const User = require('./models/user.model')
const Ticket = require('./models/ticket.model')
const bcrypt = require('bcryptjs')
const constants = require('./utils/constants')

module.exports = async ()=>{
    try{

    }
    catch(err){
        console.log("#### Error in seed data initialization #### ", err.message);
    }
}