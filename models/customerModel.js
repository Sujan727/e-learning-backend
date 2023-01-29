const mongoose = require("mongoose");

const Customer = new mongoose.model("Customer",{
    username : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    address : {
        type : String,
        required:true
    },
    phone : {
        type : String,
        required:true
    },

});


module.exports = Customer;

