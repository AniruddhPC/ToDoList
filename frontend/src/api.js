 import axios from "axios";
                    
 const api = axios.create({
  baseURL: "https://to-do-list-1-f43p.onrender.com/api/tasks",
 });
                      
 export default api;