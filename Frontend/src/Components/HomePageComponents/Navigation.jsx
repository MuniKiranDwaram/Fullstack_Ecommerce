import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Images } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux';
import HeaderContact from './HeaderContact';
import HomePageProducts from './HomePageProducts';
import { LoadAllProducts } from '../../Redux/Slices/LoadProductsClise';
import { RemoveFromWishList, SaveToWishList } from '../../../api';

const Navigation = () => {
    const[currentPage,setCurrentPage] = useState("home");
    const[cartItemsCount,setCartItems] = useState(0);
    const loginToken = useSelector((state)=>state.login.token);
    const username = useSelector((state)=>state.login.username);
    const cartData = useSelector((state)=>state.CartData.totalItems);
    const[textAreaClicked,setTextAreaClicked] = useState(false);
    const[totalCart,setTotalCart] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        setCartItems(cartData);
    },[cartData]);

    const TotalProductsAddedToCart = useSelector((state)=>state.CartData.totalItems);

    useEffect(()=>
    {
        setTotalCart(TotalProductsAddedToCart);
    },[TotalProductsAddedToCart])

    const handleCurrentPage = (name) =>
    {
        setCurrentPage(name);
    }

    const HanldleGotoCart = () =>
    {
        if(loginToken)
            navigate("/cart");
        else
            navigate("/login");
    }

    const OpenSearchBox = () =>
    {
        setTextAreaClicked(!textAreaClicked);
    }

    const HandleSearchQuery = (query) =>
    {
        dispatch(LoadAllProducts({query:query}));
    }

    const HandleGoToWishList =async () =>
    {
        navigate("/WishList");
    }
  return (
    <div className='relative'>
        <div className='flex items-center justify-between px-2 pr-5 fixed pt-10 z-50 bg-white'>
        <p className='text-[24px] font-bold ml-5 w-[300px] md:w-full'>SnapCart</p>
        <ul className='sm:flex hidden items-center justify-center gap-3'>
            <li onClick={()=>handleCurrentPage("home")} className={`${currentPage === "home" ? "underline" : ""}`}><Link to="/">Home</Link></li>
            <li onClick={()=>handleCurrentPage("shop")} className={`${currentPage === "shop" ? "underline" : ""}`}><Link to="/shop">Shop</Link></li>
            <li onClick={()=>handleCurrentPage("about")} className={`${currentPage === "about" ? "underline" : ""}`}><Link to="/about">About</Link></li>
            <li onClick={()=>handleCurrentPage("contact")} className={`${currentPage === "contact" ? "underline" : ""}`}><Link to="/support">Contact</Link></li>
        </ul>
        <div className='flex flex-row items-end justify-end gap-5'>
            <img className='w-5 h-5' src={Images.user} alt="" />
            <div className={`${loginToken ? "hidden" : "block"} ml-[-15px] w-28 text-[#23A6F0] font-bold text-[14px]`}><Link to="/login">Login</Link> / <Link to="/register">Register</Link></div>
            <p className={`${loginToken ? "block" : "hidden"} ml-[-15px] w-28 text-[#23A6F0] font-bold text-[14px]`}>{username}</p>
            <textarea onChange={(e)=>HandleSearchQuery(e.target.value)} className={`${textAreaClicked == true ? "block" : "hidden"} px-3 max-w-[200px] resize-none h-8 border border-black rounded-lg`}></textarea>
            <img onClick={()=>OpenSearchBox()} className='w-5 h-5 cursor-pointer' src={Images.search} alt="" />
            <div className='w-5 h-5 relative cursor-pointer'>
                <img src={Images.cart} alt="" onClick={()=>HanldleGotoCart()}/>
                <div className={`${totalCart > 0 ? "block" : "hidden"} w-[10px]  h-[10px] absolute top-[-5px] right-[-5px] flex items-center justify-center bg-red-900 rounded-full`}></div>
            </div>
            <img className='w-5 h-5 cursor-pointer' src={Images.fav} alt="" onClick={()=>HandleGoToWishList()}/>
        </div>
    </div>
    </div>
  )
}

export default Navigation