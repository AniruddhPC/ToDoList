import React,{useState} from 'react';
import api from '../api';

const Register=({onAuthSuccess,goToLogin})=>{
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });
const [error, setError] = useState(null);    
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null);
        if(formData.password!==formData.confirmPassword){
            return setError("Passwords same Dalna");
        }
        try{
            const {confirmPassword,...dataToSend}=formData;
            const res= await api.post('/auth/register',dataToSend);
            if(res.data.token){
            onAuthSuccess(res.data.token);
            }
            else{
                alert("Registration successful");
                goToLogin();
            }
        }
        catch(err){
            console.error('Register Errorr:',err);
            setError('Failed To Register');
        }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e112f] p-4">
        <div className='bg-[#27293d] p-8 rounded-xl shadow-2xl w-full max-w-sm'>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>
                {error && (
                    <div className="p-3 bg-red-800 text-red-200 rounded-lg text-sm text-center mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                     type="text"
                     name="name"
                     placeholder='Full Name'
                     value={formData.name}
                     onChange={handleChange}
                     required
                     className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"/>
                     </div>
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
                      minLength="8"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      />
                </div>
                <div>
                    <input 
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                    Register
                  </button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-6">
                Account Hai?
                <button 
                  onClick={goToLogin}
                  className="text-blue-400 hover:text-blue-300 ml-1 font-semibold">
                    Login yaha Kar
                  </button>
            </p>
        </div>
    </div>
)
};

export default Register;