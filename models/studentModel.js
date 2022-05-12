const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    degree:{
        type: String,
        required: true,
    },
    cgpa:{
        type: Number,
        required: true,
    },
    id:{
        type: Number,
        required: true,
    }
}, {timestamps: true})

module.exports=mongoose.model('Student', studentSchema)