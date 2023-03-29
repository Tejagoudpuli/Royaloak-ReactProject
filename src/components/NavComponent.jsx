import React, { useState } from "react";
import { BsCart3, BsHeart, BsHouseDoor, BsInfoCircle, BsPerson, BsPlusLg, BsBoxArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'

import Logo from '../images/logo.png';
import Avatar from '../images/man.png';
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const NavComponent = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const [{ user,cartShow ,cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
        else {
            setIsMenu(!isMenu);
        }
    };

    const logout =()=>{

        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type :actionType.SET_USER,
            user:null,
        });
    };

    const showCart = ()=>{
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    return (
        <header className="fixed z-50 bg-white w-screen p-3 px-4 md:p-6 md:px-16 ">
            <div className="hidden md:flex w-full h-full">
                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className=" object-contain w-56 h-20" alt="logo" />
                </Link>
                <div className="flex items-center ml-auto">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ">
                        <li className="text-base text-textcolor hover:text-maincolor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=> setIsMenu(false)}>
                            <a className=" flex items-center gap-1" href="#"><BsHouseDoor />Home</a>
                        </li>
                        <li className="text-base text-textcolor hover:text-maincolor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=> setIsMenu(false)}>
                            <a className=" flex items-center gap-1" href="#"><BsInfoCircle />  About Us</a>
                        </li>
                        <li className="text-base text-textcolor hover:text-maincolor duration-100 transition-all ease-in-out cursor-pointer" onClick={()=> setIsMenu(false)}>
                            <a className=" flex items-center gap-1" href="#"><BsPerson />  Contact Us</a>
                        </li>
                    </motion.ul>
                    <div className="flex items-center px-5">
                        <input className="border-2 rounded-sm justify-end p-1 text-sm bg-transparent font-semibold outline-none broder-none placeholder:text-gray-500" type="search" placeholder="Search here" ></input>
                        <button type="submit" className="bg-transparent hover:bg-maincolor text-maincolor font-semibold hover:text-white py-1 px-2 border  hover:border-transparent rounded ">Search</button>
                    </div>
                        <Link to={'/wishlist'}>
                        <motion.div whileTap={{ scale: 0.6 }} className="flex items-center " >
                        <BsHeart className="hover:text-maincolor  text-2xl  cursor-pointer" />
                         </motion.div >
                        </Link>
                       
                    <motion.div whileTap={{ scale: 0.6 }} className="relative flex items-center px-5 " 
                    onClick={showCart} >
                        <BsCart3 className="hover:text-maincolor text-2xl  cursor-pointer" />
                        { cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-1 right-4 w-4 h-4 rounded-full bg-maincolor flex items-center justify-center ">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                        )}
                    </motion.div>
                  
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="profile"
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  -right-5 '>
                                    {
                                        user && user.email === "pulitejagoud@gmail.com" && (
                                            <Link to={'/createItem'}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 eare-in-out text-textColor text-base"
                                                onClick={()=> setIsMenu(false)}
                                                ><BsPlusLg />New item</p>
                                            </Link>
                                        )}
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 eare-in-out text-textColor text-base "
                                    onClick={logout}><BsBoxArrowRight />logout</p>
                                </motion.div>
                            )}
                    </div>
                </div>
            </div>
            <div className=" md:hidden w-full h-full">
                <div className="flex items-center justify-between">
                    <Link to={'/'} className="flex items-center gap-2">
                        <img src={Logo} className=" object-contain w-56 h-20" alt="logo" />
                    </Link>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="profile"
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  -right-5 '>
                                    {
                                        user && user.email === "pulitejagoud@gmail.com" && (
                                            <Link to={'/createItem'}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 eare-in-out text-textColor text-base"><BsPlusLg />New item</p>
                                            </Link>
                                        )}
                                    <ul
                                        className="flex flex-col">
                                        <li className="hover:bg-slate-100 text-base text-textcolor  duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                                            <a className=" flex items-center gap-1" href="#"><BsHouseDoor />Home</a>
                                        </li>
                                        <li className="hover:bg-slate-100 text-base text-textcolor  duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                                            <a className=" flex items-center gap-1" href="#"><BsInfoCircle />  About Us</a>
                                        </li>
                                        <li className="hover:bg-slate-100 text-base text-textcolor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2">
                                            <a className=" flex items-center gap-1" href="#"><BsPerson />  Contact Us</a>
                                        </li>
                                    </ul>
                                    <p className="m-2 p-2 rounded-full shadow-md px-4 py-2 flex items-center gap-3 cursor-pointer  transition-all duration-100 eare-in-out text-textColor text-base justify-center bg-slate-200 hover:bg-gray-300" onClick={logout}><BsBoxArrowRight />logout</p>
                                </motion.div>
                            )}
                    </div>
                </div>
                <div className="flex  items-center px-1 justify-between">
                    <input className="border-2 rounded-sm justify-end p-1" type="search" placeholder="Search here" ></input>
                    <button type="submit" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border  hover:border-transparent rounded">Search</button>
                    <Link to={'/wishlist'}>
                    <motion.div whileTap={{ scale: 0.6 }} className="flex items-center px-2 " >
                        <BsHeart className="hover:text-green-500 text-2xl  cursor-pointer" />
                    </motion.div >
                    </Link>
                    

                    
                    <motion.div whileTap={{ scale: 0.6 }} className="relative flex items-center px-5 " 
                    onClick={showCart}>
                        <BsCart3 className="hover:text-green-500 text-2xl  cursor-pointer" />
                        { cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-1 right-4 w-4 h-4 rounded-full bg-maincolor flex items-center justify-center ">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </header> 
    );
};


export default NavComponent;