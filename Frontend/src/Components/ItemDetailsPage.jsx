import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LoadAllProducts } from '../Redux/Slices/LoadProductsClise';
import { getAllProducts } from '../../api';
import { useNavigate } from 'react-router-dom';
import { SelectedItemReducer } from '../Redux/Slices/SelectedItemSlice';

const ItemDetailsPage = () => {

    const[selectedItem, setSelectedItem] = useState({});
    const item = useSelector((state)=>state.SelectedProduct.product);
    const[products,setProducts]=useState([]);
    const dispatch = useDispatch();
    const HandleShowItemDetails = async (product) =>
    {
      console.log(product);
      dispatch(SelectedItemReducer({product}));
    }
    useEffect(()=>
      {
        const fetchProducts = async () =>
        {
          const products = await getAllProducts();
          setProducts(products);
        }
        fetchProducts();
      },[]);
    useEffect(()=>{
        setSelectedItem(item);
    },[item]);
  return ( 
    <div className='flex flex-col'>
      <div className={`${Object.keys(selectedItem).length === 0 ? "hidden" : "flex"} flex-grow flex-row items-center justify-between pt-24 h-full`}>
        <img className="w-[500px] h-[500px] ml-[8rem] object-contain"  src={selectedItem.image} alt="" />
        <div className='flex  gap-5 flex-col w-[60%] items-start justify-start p-5 self-start'>
            <p className='w-[500px] text-[50px] text-orange-400'>{selectedItem.title}</p>
            <p className="text-[18px] text-justify line-clamp-2 overflow-hidden">{selectedItem.description}</p>
            <p className='text-[35px] text-orange-400'>${selectedItem.price}</p>
            <button className='w-[20%] self-start border border-black py-4 rounded-md bg-slate-200 active:scale-95'>Add to Cart</button>
        </div>
      </div>
      <div className={`${Object.keys(selectedItem).length === 0 ? "mt-96" : "mt-5"} flex flex-nowrap flex-row overflow-x-auto border-t-[1px] border-black py-3`}>
        {products.map((product)=>
        (
            <div key={product.id} className='flex-shrink-0 w-[200px] border border-black mx-5 p-2'> 
              <img onClick={()=>HandleShowItemDetails(product)} className='object-contain h-[150px] cursor-pointer' src={product.image}/>
              <p className='text-[15px] overflow-hidden whitespace-nowrap text-ellipsis text-center'>{product.title}</p>
              <p className='text-[20px] text-orange-400 overflow-hidden whitespace-nowrap text-ellipsis text-center'>${product.price}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ItemDetailsPage