 import axios from "axios";
                    
 const api = axios.create({
  baseURL: "https://to-do-list-1-f43p.onrender.com/api/tasks",
 });

 api.interceptors.request.use(config=>{
    const token=localStorage.getItem('token');
    const isProtected=config.url.includes('/tasks') || config.url.includes('/change-password');
    if(token && isProtected)
    {
        config.headers.Authorization=`Bearer${token}`;
    }
    return config;
 },error=>{
    return Promise.reject(error);
 })
                      
 export default api;