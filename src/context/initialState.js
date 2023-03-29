import {  fetchUser,fetchCart } from "../utils/fetchLocalStorageData"

const userInfo =fetchUser();
const cartInfo =fetchCart();

export const initialState ={
    user : userInfo,
    woodenitems:null,
    cartShow:null,
    cartItems:cartInfo,
};