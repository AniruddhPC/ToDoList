import React,{useState,useEffect} from "react";
import api from "../api";

const getTodayDate = () => {
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
const day = String(today.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};
const Today= getTodayDate();
const EditModal = ({ task,fetchTasks,closeModal })=>{
    const [editData,setEditData]=useState({
        title:"",
        description:"",
        status:"",
        dueDate:"",
        priority:"",
    });
    useEffect(()=>{
        if(task){
            setEditData({
                title:task.title,
                description:task.description,
                status:task.status,
                priority:task.priority,
                dueDate:task.dueDate ? task.dueDate.split("T")[0]:"",
            });
        }
    },[task]);
    const handleEditChange=(e)=>{
        const {name,value}=e.target;
        setEditData((prev)=>({...prev,[name]:value}));
    }
    const saveEdit=async(e)=>{
        e.preventDefault();
        try{
            await api.put(`/tasks/${task._id}`,editData);
            fetchTasks();
            closeModal();
        }catch(err){
            console.error("Error updating task:",err)
            alert("Error updating task")
        }
    }
    if(!task) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e)=>e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-2">Edit Task: {task.title}</h2>
                <form onSubmit={saveEdit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-400 mb-1">Title</label>
                        <input
                         type="text"
                         name="title"
                         value={editData.title}
                         onChange={handleEditChange}
                         required
                         className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                         />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-400 mb-1">Description</label>
                        <textarea
                         name="description"
                         value={editData.description}
                         onChange={handleEditChange}
                         className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 resize-y"
                         />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['Status','Priority','Due Date'].map((label)=>(
                            <div key={label} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-400 mb-1">{label}</label>
                            {label==='Status' && (
                                <select name="status" value={editData.status} onChange={handleEditChange} className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            )}
                            {label==='Priority' && (
                                <select name="priority" value={editData.priority} onChange={handleEditChange} className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            )}
                            {label==='Due Date' && (
                                <input 
                                type="date"
                                name="dueDate"
                                value={editData.dueDate}
                                onChange={handleEditChange}
                                min={Today}
                                className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            )}
                            </div>
                        ))}
                        </div>
                        <div className="flex justify-end pt-4 space-x-3">
                            <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-black bg-green-500 rounded-lg hover:bg-green-600 transition">
                                Save
                            </button>
                         </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal;