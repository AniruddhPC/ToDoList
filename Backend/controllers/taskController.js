const taskService=require("../services/taskService")
exports.createTask=async(req,res)=>
{
    try{
        const task=await taskService.createTask(req.body,req.user.id);
        res.status(201).json(task);
    }catch(error)
    {
        res.status(400).json({message:error.message});
    }
}
exports.getAllTasks=async(req,res)=>
{
try{
        const tasks=await taskService.getAllTasks(req.user.id);
        res.status(200).json(tasks);
}catch(error)
{
        res.status(500).json({message:error.message});
}
}
exports.getTaskById=async(req,res)=>
{
try{
        const task=await taskService.getTaskById(req.params.id);
        if(!task) return res.status(404).json({message:"task Not Fount"});
        if(task.user.toString()!=req.user.id){
                return res.status(401).json({message:"Not authirised"});
        }
        res.status(200).json(task);
}catch(error){
        res.status(404).json({message:error.message});
}
}                                                                           
exports.updateTask=async (req,res)=>
{
try{
        const task=await taskService.updateTask(req.params.id,req.body);
        if(!task) return res.status(404).json({message:"task Not Fount"});
        if(task.user.toString()!==req.user.id){return res.status(401).json({message:"Not autorised"})};
        res.status(200).json(task);
}catch(error){
        res.status(404).json({message:error.message});
}
}
exports.deleteTask=async(req,res)=>
{
try{
        const task=await taskService.deleteTask(req.params.id);
        if(!task) return res.status(404).json({message:"task Not Fount"});
        if(task.user.toString()!==req.user.id){return res.status(401).json({message:"Not autorised"})};
        res.status(200).json("Task Deleted Successfully");
}catch(error){
        res.status(404).json({message:error.message});
}
}
exports.searchTasks=async(req,res)=>
{
try{
        const query=req.query.title || "";
        const tasks=await taskService.searchTasks(query,req.user.id);
        res.status(200).json(tasks);
}catch(error){
        res.status(404).json({message:error.message});
}
}