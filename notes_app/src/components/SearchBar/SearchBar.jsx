import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function SearchBar({value,onChange,handleSearch,onClearSearch}) {
  return (
    <div className='w-90 bg-slate-100 px-4 rounded flex items-center '>
        <input 
        type="text" 
        placeholder='Search'
        onChange={onChange}
        value={value}
        className='w-full text-xs bg-transparent py-[11px] outline-none'/>

        {value && <RxCross2 className='text-slate-400 cursor-pointer hover:text-black mr-2 size-5' onClick={onClearSearch}/>}

        <IoSearchOutline className='text-sm text-slate-400 cursor-pointer hover:text-black size-5' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar