import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center pt-24 w-full h-full text-center'>
        <div className=''>
            <h2 className='text-[50px] font-semibold'>Our Story</h2>
            <p className='text-[25px]'>Our journey began in 2015 with a vision to revolutionize online shopping...</p>
        </div>
        <div className='pt-10 w-[50%]'>
            <p className='text-[40px] overflow-hidden'>We’re The SnapCart team. And we’re here to simplify your shopping.</p>
            <p className='text-[25px]'>We are committed to providing high-quality products while delivering an exceptional shopping experience for our customers.</p>
        </div>
        <div className='bg-gray-200 p-8 text-center w-[80%] mt-5'>
            <h2 className='text-2xl font-semibold'>Ready to Shop?</h2>
            <p className='text-lg'>Browse our latest collection of products, hand-picked just for you!</p>
            <p className='mt-4 inline-block px-6 py-3 bg-gray-500 cursor-pointer text-white rounded-lg'><Link to="/shop">Start Shopping</Link></p>
        </div>
    </div>
  )
}

export default About