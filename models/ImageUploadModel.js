const mongoose = require('mongoose');

var photouploadSchema = mongoose.Schema({
    phot_name: {
        type: String
    },
    phot_path:{
        type:String
    }

})

module.exports =  mongoose.model('photouploadSchema', photouploadSchema);