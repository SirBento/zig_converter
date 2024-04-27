import { useState } from "react"
import { Axios } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ChangeRate = () => {

  const [values, setValues] = useState({
    forexRateZWL: "",
    forexRateZiG: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Axios.post('/rate/set', values).then(res => {
      if(res.status === 200){
        toast.info(res.data.msg);
      }else{
        toast.warn("Something went wrong.");
      }
    }).catch(err => {
      toast.error("Internal server error.");
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
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="forexRateZWL" className="block mb-2 text-sm font-medium text-black dark:text-white">forexRateZWL</label>
                            <input type="text" name="forexRateZWL" id="forexRateZWL" className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="forexRateZWL" required onChange={(e) => setValues({...values, forexRateZWL: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="forexRateZiG" className="block mb-2 text-sm font-medium text-black dark:text-white">forexRateZiG</label>
                            <input type="text" name="forexRateZiG" id="forexRateZiG" placeholder="forexRateZiG" className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-red focus:border-red block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setValues({...values, forexRateZiG: e.target.value})}/>
                        </div>
                        
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Rate</button>
                        
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default ChangeRate