import axios from "axios"
import React, { useEffect, useState } from 'react'
import { getAllProducts, LoadWishList, RemoveFromWishList, SaveToCart, SaveToWishList } from '../../../api'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoadAllProducts } from '../../Redux/Slices/LoadProductsClise';
import { AddToCart, RemoveFromCart, SetTotalProducts } from '../../Redux/Slices/CartSlice';
import { Images } from '../../assets/assets';
import { SelectedItemReducer } from '../../Redux/Slices/SelectedItemSlice';

const HomePageProducts = () => {

    const[products,setProducts] = useState([]);
    const[cartData,setCartData] = useState([]);
    const[userID,setUserId] = useState(null);
    const[wishListData,SetWishListData] = useState({});
    const[FavList,setFavList] = useState([]);

    const[filteredProducts,SetFilteredProducts] = useState([]);

    const SearchQuery = useSelector((state)=>state.LoadProducts.searchQuery);

    useEffect(()=>
    {
      if(SearchQuery)
      {
        const filters = products.filter((product)=>{
          return product.description.toLowerCase().includes(SearchQuery.toLowerCase());})
        
        SetFilteredProducts(filters);
      }
      else{
        SetFilteredProducts(products);
      }
    },[SearchQuery,products]);

    const nav = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchProducts = async ()=>
        {
          const products = await getAllProducts();
          if(products)
          {
            dispatch(LoadAllProducts({products:products}));
          }
          setProducts(products);
          SetFilteredProducts(products);
        }
        fetchProducts();
    },[]);

    const data = useSelector((state)=>state.CartData.cartItems);
    const userId = useSelector((state)=>state.login.userId);
    useEffect(()=>{
      setCartData(data);
    },[data]);

    useState(()=>
    {
      setUserId(userId);
    },[userId]);

    const HandleShopMore =async ()=>
    {
        await nav("/Shop");
    }
    const total = useSelector((state)=>state.CartData.totalItems);
    const loginToken = useSelector((state)=>state.login.token);
    const HandleAddToCart = async (id,image,price,title,description) =>{
        dispatch(SetTotalProducts({totalItems:total + 1}));
        SaveToCart({id,image,price,title,description,userID});
    }

    const HandleShowItemDetails = async (id,image,price,title,description) =>
    {
      dispatch(SelectedItemReducer({id,image,price,title,description,userID}));
      await nav("/itemDetails");
    }
    
    const HandleAddToWishList = async (id,image,price,title,description) =>
    {
      if(loginToken)
      {
        SetWishListData((prev)=>({...prev,[id]:true}));
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
      SetWishListData((prev)=>({...prev,[id]:false}));
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
  return (
<div className="grid grid-cols-4 pt-24 gap-5 place-center">
  {filteredProducts.length > 0 ? (filteredProducts.map((product) => (
    <div key={product.id} className="border cursor-pointer">
      <div className="relative w-full h-[300px]">
        <img onClick={()=>HandleShowItemDetails(product)}
          src={product.image}
          alt=""
          className="w-full h-full object-contain"/>
        <img onClick={()=>HandleAddToWishList(product.id,product.image,product.price,product.title,product.description,product.userID)} src={Images.favBlack} className={`${FavList.some(item => item.id == product.id) ? "hidden" : "block" } h-7 w-7 absolute top-3 right-3`} alt="" />
        <img onClick={()=>HandleRemoveFromCart(product.id,product.image,product.price,product.title,product.description,product.userID)} src={Images.favRed} className={`${FavList.some(item => item.id == product.id) ? "block" : "hidden" } h-7 w-7 absolute top-3 right-3`} alt="" />
      </div>
      <div className="flex flex-col items-center justify-start bottom-0 bg-slate-200 w-auto h-auto min-h-[150px] m-5 p-5 gap-2">
        <p className='w-auto text-[15px] text-center font-bold self-center'>{product.title}</p>
        <p className='w-auto text-[15px] text-gray-500 text-center font-bold self-center underline'>Rating-({product.rating?.rate || "No rating"})</p>
        <p className='w-[50px] text-[20px] font-bold text-orange-600'>&#x20B9;{product.price}</p>
        <div className='h-auto flex flex-col items-center justify-center w-full'>
            <p className='bg-gray-500 cursor-pointer text-white rounded-md text-center w-auto min-w-[100px] active:bg-gray-600' onClick={()=>HandleAddToCart(product.id,product.image,product.price,product.title,product.description)}>Add to cart</p>
            <p className='w-auto text-[25px] mx-2 text-center font-bold self-center min-w-5 text-orange-500'>{cartData.find(item => item.id === product.id)?.quantity || ""}</p>
        </div>
        <p className='w-auto text-[15px] text-center font-bold self-center underline cursor-pointer'><Link to='/cart'>Go to Cart</Link></p>
      </div>
    </div>
  ))): <p>No items to Display</p>}

<div className="col-span-4 flex justify-center my-4">
    <button onClick={HandleShopMore} className="">Show More</button>
  </div>
</div>
  )
}

export default HomePageProducts