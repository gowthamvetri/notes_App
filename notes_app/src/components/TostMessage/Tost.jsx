import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function Tost({ isShow, message, type, onClose }) {


  useEffect(() => {
    const timeout = setTimeout(()=>{
      onClose();
    },3000)
  
    return () => {
      clearTimeout(timeout)
    }
  }, [onClose])
  
  return (
    <div className={`absolute top-20 right-6 transition-all duration-400 ${isShow ? "opacity-100" :"opacity-0"}`}>
      <div className={`min-w-52 bg-white border border-gray-300 shadow-2xl rounded-md after:w-[5px] after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
        <div className="flex items-center py-2 px-4 gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-200" : "bg-green-200"
            }`}
          >
            {type==="delete" ? <MdDeleteOutline className=" text-2xl text-red-500"/>: <LuCheck className="text-2xl text-green-500" />}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Tost;
