const { Schema, model } = require('mongoose');

const UserSchena = Schema({
    name:String,
    email:{
        
    }
});

module.exports = model("User", UserSchena);