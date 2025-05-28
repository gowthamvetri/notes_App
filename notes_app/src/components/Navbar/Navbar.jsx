import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

function Navbar({userInfo,onSerachNotes,getNotes}) {

  const navigate = useNavigate();
  const [searchQuerry,setSerachQuerry] = useState("")

  const onClearSearch = ()=>{
    setSerachQuerry("");
    getNotes()
  }

  const handleSearch = ()=>{
    if(searchQuerry){
      onSerachNotes(searchQuerry)
    }
  }

  
  const onLogout= ()=>{
    navigate("/signin")
    localStorage.clear()
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <SearchBar value={searchQuerry} onChange={(e)=>{
          setSerachQuerry(e.target.value)
        }} onClearSearch={onClearSearch}
        handleSearch={handleSearch}/>

        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar