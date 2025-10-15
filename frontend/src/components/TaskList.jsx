import React from "react";
import api from "../api";
const TaskList = ({ tasks, fetchTasks,openEditModal}) => {
  const deleteTask = async (id) => {
    try {
      if(window.confirm("Are you sure?")){
      await api.delete(`/${id}`);
      fetchTasks();
    }
    } catch (err) {
      console.error(err);
      alert("Error deleting task!");
    }
  };
  const getPriorityClass=(priority)=>`priority-${priority.toLowerCase()}`;
  const getStatusClasses=(status)=>
  {
    switch(status.toLowerCase()){
      case 'completed':return 'bg-green-700 text-green-300';
      case 'in-progress': return 'bg-yellow-700 text-yellow-300';
      case 'pending':
        default: return 'bg-gray-700 text-gray-400';
    }
  }
  const getPriorityTagClasses=(priority)=>{
    switch(priority.toLowerCase()){
      case 'high':return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-700 text-white';
      case 'low':
        default: return 'bg-green-600 text-black';
    }
  }
return (
  <div className="pb-10">
    <h2 className="text-2xl font-bold mb-6 text-white">Task List</h2>
    {tasks.length===0 ? (
      <p className="text-gray-400 italic">No Tasks Added</p>
    ) :(
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {
          tasks.map((task=>(
            <div key={task._id} className={`p-5 rounded-xl shadow-xl bg-[#27293d] hover:shadow-2xl hover:scale-[1.01] transition duration-300 ${getPriorityClass(task.priority)}`}>
              <div className="flex justify-between items-start mb-3 pb-2 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white">{task.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${getStatusClasses(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{task.description}</p>
              <div className="flex justify-between items-center text=sm mb-4 border-t border-gray-700 pt-3">
                <div className="flex flex-col">
                  <strong className="text-gray-300 font-semibold">Due Date</strong>
                  <span className="text-gray-400">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"
                  }
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <strong className="text-gray-300 font-semibold">Priority</strong>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${getPriorityTagClasses(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button 
                  onClick={()=>openEditModal(task)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-blue-600 transition group"
                  title="Edit"
                  ><svg className="w-5 h-5 group-hover:stroke-white stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                  <button 
                   onClick={()=>deleteTask(task._id)}
                   className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-red-600 transition group"
                   title="Delete">
                    <svg className="w-5 h-5 group-hover:stroke-white stroke-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M4 7h16"/>
                  </svg>
                   </button>
              </div>
              </div>
          )))
        }
        </div>
    )
    }
  </div>
)
  
};
export default TaskList;
