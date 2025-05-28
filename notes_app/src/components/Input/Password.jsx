import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";


function Password({value,onChange,placeholder}) {

    const [isShowPass,setisShowPass] = useState(false);

    const togglePass = ()=>{
        setisShowPass(!isShowPass);
    }

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
        className='w-full text-sm bg-tranparent py-3 outline-none rounded mr-3'
        value={value}
        onChange={onChange}
        type={isShowPass?"text":"password"} 
        placeholder={placeholder||"Password"}/>

        {isShowPass?<FaRegEye
        size={25}
        className='cursor-pointer primary'
        onClick={()=>{
            togglePass()}
        }
        />:<FaRegEyeSlash
        size={25}
        className='cursor-pointer primary'
        onClick={()=>{
            togglePass()}
        }/>}

    </div>
  )
}

export default Password