import React from 'react'

const Contact = () => {
  return (
    <div className='text-black pt-24 grid grid-cols-3 place-items-center h-screen'>
        <form action="submit" className='col-start-2 col-span-1 flex flex-col items-center justify-center gap-5'>
            <p className='text-[30px] col-start-2'>Tell us about your query</p>
            <input className='h-10 border border-gray-500 p-4' type="email" name="" id="" placeholder='Your Email ID'/>
            <input className='h-10 border border-gray-500 p-4' type="text" name="" id="" placeholder='Phone Number'/>
            <input className='h-24 border border-gray-500 p-4' type="text" name="" id="" placeholder='Query'/>
            <input type="submit" className='bg-gray-400 rounded-sm cursor-pointer text-white h-10 hover:bg-gray-300 hover:text-black transition-all duration-75 ease-in-out'/>
        </form>
    </div>
  )
}

export default Contact