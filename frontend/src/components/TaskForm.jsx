 import React, { useState } from "react";
 import api from "../api";

const getTodayDate = () => {
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
const day = String(today.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};
const Today = getTodayDate();
const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    priority: "medium",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", formData);
      fetchTasks();
      setFormData({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
        priority: "medium",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding task!");
    }
  };
  return(
    <div className="bg-[#27293d] p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Add Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-semibold text-gray-400 mb-1">Title</label>
          <input
           type="text"
           id="title"
           name="title"
           value={formData.title}
           onChange={handleChange}
           required
           className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
           />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-semibold text-gray-400 mb-1">Description</label>
          <textarea
           id="description"
           name="description"
           value={formData.description}
           onChange={handleChange}
           className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 resize-y"
           />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-semibold text-gray-400 mb-1">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
            <option value="pending">Pending</option>
            <option value="in-progess">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="dueDate" className="text-sm font-semibold text-gray-400 mb-1">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            min={Today}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-400 mb-1">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
        Add Task
        </button>
      </form>
    </div>
  )
};
export default TaskForm;
