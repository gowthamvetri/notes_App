import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/Input/Password";
import { validate } from "../../utils/validateEmail";
import axiosInstance from "../../utils/axiosInstance";

function LogIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const navigate =  useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault()

    
    if(!validate(email)){
      seterror("Please Enter a valid Email ID");
      return;
    }

    if(!(password)){
      seterror("Please provide password");
      return;
    }
    seterror("");
  

  //API call
    try {
      const response = await axiosInstance.post('/api/user/login',{
        email : email,
        password : password
      })

      if(response.data && response.data.accessKey){
        localStorage.setItem('token',response.data.accessKey)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        seterror(error.response.data.message)
      }
      else{
        seterror("An un expected error occured.Please try again later");
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex item-center justify-center mt-30">
        <div className="w-96 border  rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="EmailID"
              className="input-box"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <Password value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder={"Password!!"}/>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary cursor-pointer">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not regestered yet? <Link
                className="font-medium text primary underline"
                to={"/signup"}
              >
                Create New Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
