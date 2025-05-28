import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Password from "../../components/Input/Password";
import {validate} from "../../utils/validateEmail";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
      seterror("Provide user name field")
    }

    if(!validate(email)){
      seterror("Provide valid email ID")
    }

    if(!password){
      seterror("Please provide password");
      return
    }
    seterror("");

    //Signup call
    try {
      const response = await axiosInstance.post('/api/user/register',{
        name : name,
        email : email,
        password : password
      })

      // console.log(response)

      if(response.data && response.data.error){
        seterror(response.data.message)
        return
      }

      if(response.data && response.data.accessKey){
        localStorage.setItem("token",response.data.accessKey);
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

      <div className="flex item-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Email ID"
              className="input-box"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <Password
              placeholder={"Password"}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
            />

            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

            <button className="btn-primary cursor-pointer">Create an Account</button>

            <p className="text-sm text-center mt-4">Already have an account? <Link to="/" className="primary underline">Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
