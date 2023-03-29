import React, { useEffect ,useRef, useState } from 'react'
import { BsCart3, BsHeart } from 'react-icons/bs'
import {MdAddShoppingCart} from 'react-icons/md'
import { motion } from 'framer-motion'
import  NotFound from '../images/nodata.jpg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({flag,data,scrollValue}) => {
  const rowContainer =useRef()
  const [items, setItems] = useState([]);

  const [{ cartItems },dispatch] =useStateValue();

  const addtocart = () =>{
    dispatch({
      type : actionType.SET_CARTITEMS,
      cartItems : items,
    });
    localStorage.setItem("cartItems",JSON.stringify(items));
  };            

  useEffect(()=>{
    rowContainer.current.scrollLeft += scrollValue;
  },[scrollValue]);

  useEffect(()=>{
    addtocart();
  },[items]);

  return (
    <div 
    ref={rowContainer}
    className={`w-full flex items-center gap-3 scroll-smooth
     ${flag ? 
     'overflow-scroll scrollbar-none' : 
     'overflow-x-hidden flex-wrap '}`}>
      { 
      data && data.length >0 ? 
       data.map((item)=>(
        <motion.div key={item?.id} whileHover={{scale:0.96}}  className='w-full md:w-300 min-w-[300px] md:min-w-[335px] my-12 h-auto bg-cardOverlay  backdrop-blur-lg '>
        <div className='h-full  block items-center justify-between'>
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-maincolor hover:drop-shadow-lg">
            <a href="#">
              <img 
              className=" rounded-t-3xl w-full  h-[200px]" 
              src={item?.imageURL} 
              alt="product image" />
              <motion.div whileTap={{ scale: 0.6 }} className="ml-4 absolute  top-4 right-auto  rounded-full text-white flex items-center justify-center" >
                <BsHeart className=" text-2xl  cursor-pointer" />
              </motion.div >
            </a>
            <div className="mt-3 px-5 pb-5">
              <a href="#">
                <div className='w-full h-10 mb-3'>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                </div>
                <p className='mt-1 text-sm text-white'>{item?.calories}</p>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold  px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800  mr-2">5.0</span>
                <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <div  className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs.{item?.price}</span>
                <motion.div 
                whileTap={{ scale: 0.7 }} 
                className= " text-white   rounded-full text-sm  text-center"
                onClick={() =>setItems([...cartItems,item])}
                >
                  <MdAddShoppingCart className='cursor-pointer text-2xl'/>
                  </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      )) : <div className='w-full flex flex-col items-center justify-center'>
        <img src={NotFound} className='h-340'/>
        <p className='text-xl text-headingColor font-semibold my-2'> Items Not Avilable</p>
        </div>}
    </div>
  )
}

export default RowContainer
