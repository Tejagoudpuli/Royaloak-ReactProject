import React, { useEffect } from 'react';
import { NavComponent,MainContainer,CreateContainer, CartContainer, WishList, Footer } from './components';
import { AnimatePresence } from 'framer-motion';
import { Route,Routes } from 'react-router-dom';
import { useStateValue } from './context/StateProvider';
import { getAllWoodenItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';

const  App = ()=> {

  const [{},dispatch] = useStateValue();

  const fetchData =async () => {
    await getAllWoodenItems().then((data) =>{
      dispatch({
        type : actionType.SET_WOODEN_ITEMS,
        woodenitems: data
      })
      
    });
  };

  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <AnimatePresence >
    <div className="w-screen h-auto flex flex-col bg-white">
     <NavComponent/>
      <main className='mt-16 md:mt-20 px-4 md:px-16 w-full'>
        <Routes>
          <Route path='/*' element={<MainContainer/>}/>
          <Route path='/createItem' element={<CreateContainer/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
    </AnimatePresence>
  );
};

export default App;



