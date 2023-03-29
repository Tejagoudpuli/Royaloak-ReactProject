import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft , MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {
  const [{woodenitems,cartShow},dispatch] = useStateValue()

  const [scrollValue,setScrollValue] = useState(0)

  useEffect(()=>{},[scrollValue,cartShow])

  return (
   <div className='w-full h-auto flex-col items-center justify-center ' >
    <HomeContainer/>

    <section className='w-full p-4 '>
      <div className='w-full flex items-center justify-between'>
      <p className='text-lg font-semibold capitalize relative text-headingColor before:absolute 
      before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2
      before:left-0 before:bg-gradient-to-tr from-maincolor to-green-700 transition-all
      ease-in-out duration-100 '>Top Picks For You</p>
     
      <div className='hidden md:flex gap-3 items-center'>
      <motion.div whileTap={{ scale: 0.75}} className='w-8 h-8 rounded-lg bg-maincolor hover:bg-green-600 
      cursor-pointer  hover:shadow-lg
      flex items-center justify-center'
      onClick={()=> setScrollValue(-650)}>
        <MdChevronLeft className='text-lg text-white'/>
      </motion.div>
      <motion.div whileTap={{ scale: 0.75}}className='w-8 h-8 rounded-lg bg-maincolor hover:bg-green-600 
      cursor-pointer  hover:shadow-lg
      flex items-center justify-center'
      onClick={()=> setScrollValue(650)}>
        <MdChevronRight className='text-lg text-white'/>
      </motion.div>
      </div>
      </div>
      <RowContainer 
      scrollValue={scrollValue}
      flag={true}  
      data={ woodenitems ?.filter((n)=> n.category === 'sofas')}/>
    </section>
    <MenuContainer/>
    { cartShow && (
       <CartContainer />
    )}
   </div>
  )
}

export default MainContainer
