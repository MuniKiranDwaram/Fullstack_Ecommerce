import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Images } from '../assets/assets'
import { getLoginStatus } from '../../api';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../Redux/Slices/LoginSlice';

const LoginPage = () => {
    const nav = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loginMessage,setLoginMessage] = useState("");

    const dispatch = useDispatch();
    const handleLoginSubmit=async (e)=>{
        e.preventDefault();
        const res = await getLoginStatus({email,password});
        if(res.status == 200)
        {
            if(res)
                {
                    dispatch(authenticateUser({token:res.data.message,name:res.data.name,userID:res.data.UserId}));
                    nav("/");
                    setLoginMessage(res.data.Statusmessage);
                }
                else
                {
                    setLoginMessage(res.data.Statusmessage);
                }
        }
        else{
            setLoginMessage(res.data.Statusmessage);
        }
    }

    setTimeout(function() {
        setLoginMessage("");
    }, 2000);
  return (
    <div className='bg-[#FFEDE1] grid md:grid-cols-2 md:grid-rows-1 w-[100vw] grid-cols-1 grid-rows-2'>
        <div className=' bg-white w-100% h-[100vh] flex flex-col items-center justify-center rounded-md'>
            <div className='w-[70%]'>
                <h1 className='text-gray-900 font-normal'>welcome</h1>
                <h1 className='text-[56px] text-[#F47458] font-semiBold'>Sign in</h1>
                <form action="" className='flex flex-col gap-2' onSubmit={handleLoginSubmit}>
                    <p className='text-gray-600 font-normal'>Email</p>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter email' type="email" />
                    <p className='text-gray-600 font-normal'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='bg-[#FFF6F4] w-[300px] p-2' placeholder='enter password' type="password" />
                    <input type="submit" className='self-start rounded-lg bg-[#F47458] px-4 py-2 w-[100px] mt-5 cursor-pointer'/>
                    <p>I don't have an account <Link className='text-[#F47458]' to="/signup">Sign up</Link></p>
                    <p className={`${loginMessage ? "block" : "hidden"} transition-all duration-0 ease-out text-center text-red-500`}>{loginMessage}......</p>
                </form>
            </div>
        </div>
        <div className='relative'>
            <img className='absolute bottom-10 right-[50px]' src={Images.LoginPageBgMenIcon} alt="" />
        </div>
    </div>
  )
}

export default LoginPage