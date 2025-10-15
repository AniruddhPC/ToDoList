import React,{useState} from 'react';
import api from '../api';

const Login=({onAuthSuccess,goToRegister})=>{
    const [formData,setFormData]=useState({email:'',password:''});
    const [error,setError] =useState(null);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null);
        try{
            const res= await api.post('/auth/login',formData);
            onAuthSuccess(res.data.token);
        }
        catch(err){
            console.error('Login Errorr:',err);
            setError('Login Failed');
        }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e112f] p-4">
        <div className='bg-[#27293d] p-8 rounded-xl shadow-2xl w-full max-w-sm'>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-800 text-red-200 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}
                <div>
                    <input 
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      />
                </div>
                <div>
                    <input 
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                    Login
                  </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-6">
                Account Nahi Hai?
                <button 
                  onClick={goToRegister}
                  className="text-blue-400 hover:text-blue-300 ml-1 font-semibold">
                    Register Kar
                  </button>
            </p>
        </div>
    </div>
)
};

export default Login;