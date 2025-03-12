import React from 'react'
import { Images } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-black text-white w-full py-2 flex flex-col items-center justify-center text-center gap-5'>
            <p className='text-white text-[25px] text-center'>Snapcart.com</p>
            <div className='text-white space-x-4 flex gap-0 justify-center'>
                    <a className='text-center w-14'>Home</a>
                    <a className='text-center w-14'>Shop</a>
                    <a className='text-center w-14'>About</a>
                    <a className='text-center w-14'>Support</a>
            </div>
            <div className='flex flex-row items-center justify-center gap-5'>
                <img className='w-5 h-5'  src={Images.fb} alt="" />
                <img className='w-5 h-5' src={Images.insta} alt="" />
                <img className='w-5 h-5' src={Images.twitter} alt="" />
            </div>
            <p>Copyright &copy; 2023 Snapcart. All rights reserved.</p>
    </footer>
  )
}

export default Footer