const Task=require("../models/Task")
exports.createTask=async(taskData)=>
{
    const task=new Task({...taskData,user:userId});
    return await task.save();
}
exports.getAllTasks=async()=>{
    return await Task.find({user:userId});
}
exports.getTaskById=async(id)=>{
    return await Task.findById(id);
}
exports.updateTask=async(id,updateData)=>{
    return await Task.findByIdAndUpdate(id,updateData,{new:true});
}
exports.deleteTask=async(id)=>
{
    return await Task.findByIdAndDelete(id);
}
exports.searchTasks=async(title)=>{
    return await Task.find({user:userId,title:{$regex:title,$options:"i"}});
}