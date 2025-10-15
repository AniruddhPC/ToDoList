import React,{useState} from 'react';
import api from '../api';

const ChangePasswordModal=({closeModal})=>{
    const [formData,setFormData]=useState({
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
    });
    const [error,setError]=useState(null);
    const [message,setMessage]=useState(null);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null);
        setMessage(null);
        if(formData.newPassword!==formData.confirmPassword){
            return setError("Passwords match nahi ho raha hai")
        }
        if(formData.newPassword.length<8){
            return setError("Password Length Chota Hai");
        }
        if(formData.currentPassword===formData.newPassword)
        {
            return setError("Same Password Mat rak Thoda tho change karle");
        }
        try{
            await api.put('/auth/change-password',formData);
            setMessage("Change Hogaya Bhai Password");
            setTimeout(closeModal,3000); 
        }
        catch(err){
            console.error('Password Change Falied:',err);
            setError('Password Change Falied');
        }
    }
return(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
        <div className='bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md'
        onClick={(e)=>e.stopPropagation()}>
            <h2 className='text-2xl font-bold text-white mb-6 text-center'>Change Passsword</h2>
            {message && <div className='p-3 bg-green-700 text-green-200 rounded-lg text-sm text-center mb-4'>{message}</div>}
            {error && <div className='p-3 bg-red-800 text-red-400 rounded-lg text-sm text-center mb-4'>{error}</div>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <input 
                      type="password"
                      name='currentPassword'
                      placeholder='Current Password'
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <input 
                      type="password"
                      name='newPassword'
                      placeholder='New Password'
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                    <input 
                      type="password"
                      name='confirmPassword'
                      placeholder='Confirm Password'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <button type='button' onClick={closeModal} className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                    Cancle
                </button>
                <button type='submit' className="px-4 py-2 text-sm font-medium text-black bg-green-600 rounded-lg hover:bg-green-700 transition">
                    Update Password
                </button>
            </form>
        </div>
    </div>
)
};

export default ChangePasswordModal;

