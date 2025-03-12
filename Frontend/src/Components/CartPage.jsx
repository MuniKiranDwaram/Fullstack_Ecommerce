import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadCartData, RemoveFromCart, SaveToCart } from '../../api';
import { Link } from 'react-router-dom';
import { Images } from '../assets/assets';
import { SetTotalProducts } from '../Redux/Slices/CartSlice';
const CartPage = () => {
    const [cartData, setCartData] = useState([]);
    const[totalPrice,setTotalPrice] = useState(0);
    const cartItems = useSelector((state) => state.CartData.cartItems);
    const[NoOfCartItems,SetNoOfCartItems] = useState(0);

    const userID = useSelector((state)=>state.login.userId);

    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async ()=>{
        const addedCart = await LoadCartData(userID);
        setCartData(addedCart);
      }
      fetchData();
      }, [cartData]);

      useEffect(()=>
      {
        const getTotalPrice =async () =>
        {
          let price = 0;
          let totalQuantity = 0;
          cartData.forEach((item)=>
          {
            price += item.price * item.quantity;
            totalQuantity += item.quantity;
          });
          setTotalPrice(price);
          SetNoOfCartItems(totalQuantity);
          dispatch(SetTotalProducts({totalItems:totalQuantity}));
        }
        getTotalPrice();
      },[cartData]);


      const handleRemoveFromCart = async (item,RemoveCompleteItem) =>
      {
        await RemoveFromCart(item,RemoveCompleteItem);
      }

      const HandleAddToCart = async (item) =>{
        const updatedCart = await SaveToCart(item);
        console.log(NoOfCartItems)
        dispatch(SetTotalProducts({totalItems:NoOfCartItems}));
      }
  return (
  <div className='pt-20 flex flex-row items-center justify-center w-full min-h-screen h-auto'>
    <div className={`${Object.keys(cartData).length === 0 ? "hidden" : "grid"} grid-cols-4 w-full text-center gap-4`}>
      <div className='col-span-4 grid grid-cols-4 font-bold border-b-2 border-gray-400 py-2'>
        <p>Image</p>
        <p>Price/Item</p>
        <p>Quantity</p>
        <p>Total Price</p>
      </div>
      {cartData.map((item, index) => {
        return (
          <div key={index} className={`grid grid-cols-4 col-span-4 place-items-center`}>
            <img src={item.image} className="w-auto h-32 object-cover" />
            <p>&#x20B9;{item.price}</p>
            <div className='flex flex-row items-center justify-center gap-0 text-center px-36'>
              <img onClick={()=>handleRemoveFromCart(item,false)} className='h-4 w-4 object-contain inline-block cursor-pointer active:scale-90' src={Images.remove} alt="" />
              <p className='inline-block m-0'>{item.quantity}</p>
              <img onClick={()=>HandleAddToCart(item)} src={Images.add} alt="" className='h-4 w-4 object-contain cursor-pointer active:scale-90'/>
            </div>
            <div className='relative w-full'>
              <p>&#x20B9;{(item.price * item.quantity).toFixed(2)}</p>
              <p onClick={()=>handleRemoveFromCart(item,true)}  className='col-start-4 cursor-pointer w-[40%] absolute right-0 top-1 text-gray-400 underline text-[12px]'>remove item from cart</p>
            </div>
          </div>
        );
      })}

      <div className='col-span-4 grid grid-cols-4 font-bold border-t-2 border-b-2 border-gray-400 py-2'>
        <p className='col-span-3'>Total amount to be Paid</p>
        <p className='col-start-4'>&#x20B9;{totalPrice.toFixed(2)}</p>
      </div>

      <div className='col-start-2 col-span-2 bg-gray-400 rounded-lg cursor-pointer text-white m-5 p-2 w-full hover:bg-gray-300 hover:text-black transition-all ease-in-out'>
        <p><Link to="/pay">Make Payment</Link></p>
      </div>
    </div>
    <div className={`${Object.keys(cartData).length === 0 ? "block" : "hidden"} text-black max-h-screen text-[20px] w-[20%]`}>
       <p className='text-center h-auto'>Your cart is empty</p>
    </div>
  </div>
  )
}

export default CartPage