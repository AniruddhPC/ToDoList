 import axios from "axios";
                    
 const api = axios.create({
  baseURL: "https://todolist-5-7nmp.onrender.com/api",
 });

 api.interceptors.request.use(config=>{
    const token=localStorage.getItem('token');
    const isProtected=config.url.includes('/tasks') || config.url.includes('/change-password');
    if(token && isProtected)
    {
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
 },error=>{
    return Promise.reject(error);
 })
                      
 export default api;