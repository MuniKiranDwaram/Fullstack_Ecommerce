import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LoadWishList } from '../../api';

const WishList = () => {

    const UserID = useSelector((state)=>state.login.userId);

    const[WishList,setWishList] = useState([]);
    useEffect(()=>
    {
        if(UserID)
        {
            const FetchWishList = async ()=>
            {
                const WishList = await LoadWishList(UserID);
                const WishListArray = Array.isArray(WishList) ? WishList : Array.from([WishList]);
                setWishList(WishListArray);
            }
            FetchWishList();
        }
    },[UserID])
  return (
<div className='flex flex-row flex-wrap items-center justify-start gap-4 mt-24 mx-5'>
  {WishList.length > 0 ? (WishList.map((product) => (
    <div key={product.id} className='flex flex-col p-4 w-[200px] h-auto bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow'>
      <div className='flex justify-center mb-4'>
        <img src={product.image} alt={product.title} className='object-contain h-[150px] w-[150px]' />
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-center text-lg font-semibold truncate w-full'>{product.title}</p>
        <p className='text-center text-sm text-gray-600 mt-2 truncate w-full'>{product.description}</p>
        <p className='text-center text-xl font-bold mt-2 text-orange-600'>&#x20B9;{product.price}</p>
      </div>
      <div className='flex justify-center mt-4'>
        <button className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none'>
          Add to Cart
        </button>
      </div>
    </div>
  ))) : (<div className='text-center h-auto mt-32'>No items to display</div>)}
</div>
  )
}

export default WishList