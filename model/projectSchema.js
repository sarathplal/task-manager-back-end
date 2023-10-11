const mongoose = require('mongoose')

// schema for task 
const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        // default:false
    },
    due: {
        type: Date,
        required: true,
    }
})
// Project Schema 
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    //task field will have an array of objects with schema as taskSchema
    tasks: [taskSchema]
})

const projects = mongoose.model("projects", projectSchema)
module.exports = projects
