//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let taskModel = mongoose.Schema({
    Title:String,
    Description:String,
    Priority:String,
    Status:String,
    dueDate:String,
},
{
    collection:"TaskMaster"
});
module.exports =mongoose.model('Task',taskModel);
