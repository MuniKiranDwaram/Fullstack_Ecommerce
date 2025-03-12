import React, { useState } from 'react'
import { Images } from '../../assets/assets';
const HomeCarousel = () => {
    const carouselImages =[
      Images.carousel1,
      Images.carousel2,
      Images.carousel3
    ]

    const[currentIndex,setCurrentIndex] = useState(0);

    const HandleNextImage = (index) => 
    {
      console.log(index);
      index === 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1);
    }

    const HandlePreviousImage = (index) =>
    {
      index === 0 ? setCurrentIndex(2) : setCurrentIndex(currentIndex - 1);
    }
  return (
    <div className='px-5 pt-24 flex items-center justify-center relative'>
      <button onClick={()=>HandlePreviousImage(currentIndex)} className="absolute w-[25px] bg-black left-5 opacity-50 md:left-[250px] pl-1 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 rounded-full hover:opacity-100 self-center">
        &#10094;
      </button>
      <img src={carouselImages[currentIndex]} alt=""  className='h-[400px] w-full object-contain'/>
      <button onClick={()=>HandleNextImage(currentIndex)} className="absolute w-[25px] right-5 md:right-[250px] pr-5 bg-black opacity-50 top-1/2 transform -translate-y-1/2 text-white text-3xl p-2 rounded-full hover:opacity-100 self-center">
        &#10095;
      </button>
    </div>
  )
}

export default HomeCarousel