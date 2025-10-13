 import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
 import TaskList from "./components/TaskList";
import api from "./api";
import "./App.css";
import EditModal from "./components/EditModal";

  function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [taskToEdit,setTaskToEdit]=useState(null);
  const fetchTasks = async () => {
    try {
      const res = await api.get("/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Error fetching tasks!");
    }
  };
  const searchTask=async()=>{
    if(!searchQuery.trim()){
      alert("Enter a title to search");
      return;
    }
    try{
      const res= await api.get(`/search?title=${searchQuery}`);
      if(res.data.length===0)
      {
        alert("NO Tasks Found");
      }
      setTasks(res.data);
    }catch(err){
    console.error("Error searching tasks:", err);
    alert("Error searching tasks!");
  }
  };
  const openEditModal=(task)=>{setTaskToEdit(task)};
  const closeEditModal=()=>{setTaskToEdit(null)};
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white">
      <div className="bg-gradient-to-r from-[#526fdf] to-[#7d8fdf] p-6 shadow-xl mb-6 rounded-b-xl max-w-[1200px] mx-auto">
        <h1 className="flex items-center text-3xl font-extrabold text-white mb-4">
          Task Flow
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
          type="text"
          placeholder="Enter Title"
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          className="flex-grow p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:border-white transition"
          />
          <button onClick={searchTask} className="px-5 py-3 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 transition">
            Search
          </button>
          <button onClick={fetchTasks} className="px-5 py-3 rounded-lg font-semibold bg-gray-500 text-gray-900 hover:bg-green-600 transition">
            Show All
          </button>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 pb-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TaskForm fetchTasks={fetchTasks}/>
        </div>
      <div className="md:col-span-2">
        <TaskList
         tasks={tasks}
         fetchTasks={fetchTasks}
         openEditModal={openEditModal}
         />
      </div>
    </div>
     {taskToEdit && (
      <EditModal
       task={taskToEdit}
       fetchTasks={fetchTasks}
       closeModal={closeEditModal}
       />
     )}
     </div>
  );
}

 export default App;
