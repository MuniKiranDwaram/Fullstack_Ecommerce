import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Images } from '../assets/assets'
import { register } from '../../api';

const Register = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[address,setAddress] = useState("");
    // const[gender, setGender] = useState("");
    const[username,setUserName] = useState("");
    const [statusMessage,SetStatusMessage] = useState("");
    const[phonenumber,setPhonenumber] = useState("");
    const navigate = useNavigate();

    const dataEntered = {username,email,password,address,phonenumber};

    const handleCreateUser = async (e) =>{
        e.preventDefault();
        try
        {
            const res = await register(dataEntered);
            if(res.status == 200)
            {
                SetStatusMessage(res.data.message + "............");
                navigate("/login");
            }
            else{
                
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
        <div className='bg-[#FFEDE1] grid md:grid-cols-2 md:grid-rows-1 w-[100vw] grid-cols-1 grid-rows-2'>
            <div className='bg-white w-100% h-[100vh] flex items-center justify-center rounded-md'>
                <div className='w-[70%]'>
                    <h1 className='text-gray-900 font-normal'>welcome</h1>
                    <h1 className='text-[56px] text-[#F47458] font-semiBold'>Sign up</h1>
                    <form action="" className='flex flex-col gap-2' onSubmit={handleCreateUser}>
                        <p className='text-gray-600 font-normal'>User Name</p>
                        <input onChange={(e)=>setUserName(e.target.value)} value={username} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter your full name' type="text" />
                        <p className='text-gray-600 font-normal'>Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter email' type="email" />
                        <p className='text-gray-600 font-normal'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter password' type="password" />
                        <p className='text-gray-600 font-normal'>Gender</p>
                        <input onChange={(e)=>setPhonenumber(e.target.value)} value={phonenumber} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter password' type="text" />
                        <p className='text-gray-600 font-normal'>Address</p>
                        <input onChange={(e)=>setAddress(e.target.value)} value={address} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter your Full address' type="text" />
                        <input type="submit" className='self-start rounded-lg bg-[#F47458] px-4 py-2 w-[100px] mt-5 cursor-pointer'/>
                        <p>I have an account <Link className='text-[#F47458]' to="/login">Sign in</Link></p>
                        <p className='h-2'>{statusMessage}</p>
                    </form>
                </div>
            </div>
            <div className='relative'>
                <img className='absolute bottom-10 right-[50px]' src={Images.LoginPageBgMenIcon} alt="" />
            </div>
        </div>
  )
}

export default Register