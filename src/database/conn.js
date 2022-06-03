const mongoose = require('mongoose');

module.exports = {
    init(){
        mongoose.connect("mongodb://localhost:27017/instagram", (err) =>{
            if(err){
                console.err(err.message);
            }
        })
    }
}