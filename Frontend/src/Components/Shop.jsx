import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Images } from '../assets/assets';
import { Link } from 'react-router-dom';
import { getAllProducts, LoadWishList, RemoveFromWishList, SaveToCart, SaveToWishList } from '../../api';

const Shop = () => {
  const[products,setProducts] = useState([]);
  const userID = useSelector((state)=>state.login.userId);
  const[FavList,setFavList] = useState([]);
  useEffect(()=>
  {
    const fetch = async ()=>
    {
      const products =  await getAllProducts();
      setProducts(products);
    }
    fetch();
  },[products]);

  const loginToken = useSelector((state)=>state.login.token);

  const HandleAddToWishList = async (id,image,price,title,description) =>
  {
    if(loginToken)
    {
      const WishList = await SaveToWishList({id,image,price,title,description,userID});
      const arrayValue = Array.isArray(WishList) ? WishList : Array.from([WishList]);
      setFavList(arrayValue);
    }
    else{
      nav("/login");
    }
  }

  const HandleRemoveFromCart = async (id,image,price,title,description) =>
  {
    const WishList = await RemoveFromWishList({id,image,price,title,description,userID});
    const arrayValue = Array.isArray(WishList) ? WishList : Array.from([WishList]);
    setFavList(arrayValue);
  }
  
  useEffect(()=>
  {
    const fetchWishList = async () =>
    {
      if(userID)
      {
        const WishList = await LoadWishList(userID);
        const arrayValue = Array.isArray(WishList) ? WishList : Array.from([WishList]);
        setFavList(arrayValue);
      }
    }
    fetchWishList();
  },[userID]);

  const HandleAddToCart = async (id,image,price,title,description) =>{
        // await dispatch(AddToCart({id,image,price}));
        SaveToCart({id,image,price,title,description,userID});
    }
  return (
<div className="grid grid-cols-4 pt-24 gap-5 place-center">
  {products.map((product) => (
    <div key={product.id} className="border">
      <div className="relative w-full h-[300px]">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-contain"/>
        <img onClick={()=>HandleAddToWishList(product.id,product.image,product.price,product.title,product.description,product.userID)} src={Images.favBlack} className={`${FavList.some(item => item.id == product.id) ? "hidden" : "block" } h-7 w-7 cursor-pointer absolute top-3 right-3`} alt="" />
        <img onClick={()=>HandleRemoveFromCart(product.id,product.image,product.price,product.title,product.description,product.userID)} src={Images.favRed} className={`${FavList.some(item => item.id == product.id) ? "block" : "hidden" } h-7 w-7 cursor-pointer absolute top-3 right-3`} alt="" />
      </div>
      <div className="flex flex-col items-center justify-start bottom-0 bg-slate-200 w-auto h-auto min-h-[150px] m-5 p-5 gap-2">
        <p className='w-auto text-[15px] text-center font-bold self-center'>{product.title}</p>
        <p className='w-auto text-[15px] text-gray-500 text-center font-bold self-center underline'>Rating-({product.rating?.rate || "No rating"})</p>
        <p className='w-[50px] text-[20px] font-bold'>&#x20B9;{product.price}</p>
        <div className='h-auto flex flex-col items-center justify-center w-[100%]'>
          <p onClick={()=>HandleAddToCart(product.id,product.image,product.price,product.title,product.description)} className='bg-gray-500 cursor-pointer text-white rounded-md text-center w-auto min-w-[100px]'>Add to cart</p>
          <p className='w-auto text-[15px] text-center font-bold self-center min-w-5 text-orange-500'>{}</p>
        </div>
        <p className='w-auto text-[15px] text-center font-bold self-center underline cursor-pointer'><Link to='/cart'>Go to Cart</Link></p>
      </div>
    </div>
  ))}
</div>
  )
}

export default Shop