const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            trim:true,
        },
        status:{
            type:String,
            enum:["pending","in-progress","completed"],
            default:"pending",
        },
        dueDate:
        {
            type:Date,
            required:true,
        },
        priority:
        {
            type:String,
            enum:["low","medium","high"],
            default:"medium",
        },
    },
    {timpstamps:true}
);

module.exports=mongoose.model("Task",taskSchema);