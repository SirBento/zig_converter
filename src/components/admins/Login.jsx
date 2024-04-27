import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Axios } from "../../config";
import { toast } from "react-toastify";
import { userStore } from "../../helpers";

const Login = () => {

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

         await Axios.post(`/auth/login`, values).then(res => {
            console.log(res)
           if(res.status === 200){
                userStore(res.data)
                navigate('/change-rate');
           }else{
                toast.warn("Something went wrong. Please try again.");
           }

         }).catch(error => {
            console.log(error);
            if(error.response.data.msg){
                toast.error(`${error.response.data.msg}`);
            }else{
                toast.error(error.message);
            }
         })
    }
  return (
    <>
       <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-24">
            <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-black dark:text-white">
                Zig Convertor    
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-black dark:text-white">Your username</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required onChange={(e) => setValues({...values, username: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setValues({...values, password: e.target.value})}/>
                        </div>
                        
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Login