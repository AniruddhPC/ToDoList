 import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
 import TaskList from "./components/TaskList";
import api from "./api";
import Login from "./components/Login";
import Register from "./components/Register"
import ChangePasswordModal from './components/ChangePasswordModal'
import "./App.css";
import EditModal from "./components/EditModal";

  function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery,setSearchQuery]=useState("");
  const [taskToEdit,setTaskToEdit]=useState(null);
  const [isAuthenticated,setIsAuthenticated]=useState(!!localStorage.getItem('token'));
  const [currentPage,setCurrentPage]=useState(isAuthenticated ? 'app':'login');
  const [isProfileDropdownOpen,setIsProfileDropdownOpen] = useState(false); 
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false); 
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if(err.response && err.response.status===401)
      {
        handleLogout();
      }
      else{
      alert("Error fetching tasks!");
      }
    }
  };
  const handleclear= ()=>{
    setSearchQuery("");
    fetchTasks();
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
  const handleAuthSucces=(token)=>
  {
    localStorage.setItem('token',token);
    setIsAuthenticated(true);
    setCurrentPage('app');
  }
  const handleLogout=()=>
  {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentPage('login');
  }
  const handleOpenPasswordModal=()=>
  {
    setIsProfileDropdownOpen(false);
    setIsChangePasswordModalOpen(true);
  }
  const handleClosePasswordModal=()=>
  {
    setIsChangePasswordModalOpen(false);
  }
  const openEditModal=(task)=>{setTaskToEdit(task)};
  const closeEditModal=()=>{setTaskToEdit(null)};
  useEffect((isAuthnticated) => {
    fetchTasks();
  }, [isAuthenticated]);
  if(!isAuthenticated){
    if(currentPage==='register'){
    return <Register onAuthSuccess={handleAuthSucces} goToLogin={()=>setCurrentPage('login')}/>;
    }
    return <Login onAuthSuccess={handleAuthSucces} goToRegister={()=>setCurrentPage('register')}/>;
  }

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white">
      <div className="bg-gradient-to-r from-[#526fdf] to-[#7d8fdf] p-6 shadow-xl mb-6 rounded-b-xl max-w-[1200px] mx-auto">
        <div className="absolute top-5 right-5 z-20">
          <button 
           onClick={()=>setIsProfileDropdownOpen(!isProfileDropdownOpen)}
           className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition"
           title="Profile Menu">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
           </button>
           {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-30 border border-gray-700">
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-gray-700 transition flex items-center">
                Logout
              </button>
              <button onClick={handleOpenPasswordModal} className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-gray-700 transition flex items-center">
                Change Password
              </button>
            </div>
           )}
        </div>
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
          <button onClick={handleclear} className="px-5 py-3 rounded-lg font-semibold bg-gray-500 text-gray-900 hover:bg-green-600 transition">
            Clear
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
     {isChangePasswordModalOpen &&(
      <ChangePasswordModal closeModal={handleClosePasswordModal}/>
     )
     }
     </div>
  );
}

 export default App;
