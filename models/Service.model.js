const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    serviceName:{
        type: String,
        required: true,
    },
    categorie:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    assisting:{
        type:Number,
        required:true,
    },

    
})
const Service = mongoose.model('Service', ServiceSchema)

module.exports={Service}
