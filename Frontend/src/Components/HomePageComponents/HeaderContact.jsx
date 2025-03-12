import React from 'react'
import { Images } from '../../assets/assets'

const HeaderContact = () => {
  return (
    <div className='bg-[#252B42] text-white hidden md:grid grid-flow-row grid-cols-3 px-5 py-2 fixed z-100'>
        <div className='flex flex-row items-start'>
            <label>(225) 555-0118</label>
            <label htmlFor="">michelle.rivera@example.com</label>
        </div>
        <div className='text-center'>
            <label htmlFor="">Follow Us  and get a chance to win 80% off</label>
        </div>
        <div className='flex flex-row items-center justify-center'>
            <div className='flex flex-row gap-4 items-center justify-end'>
                <label className='w-[100px] justify-end' htmlFor="">Follow Us  :</label>
                <img className='w-5 h-5' src={Images.insta} alt="" />
                <img className='w-5 h-5' src={Images.yt} alt="" />
                <img className='w-5 h-5' src={Images.fb} alt="" />
                <img className='w-5 h-5' src={Images.twitter} alt="" />
            </div>
        </div>
    </div>
  )
}

export default HeaderContact