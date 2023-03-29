import React, { useEffect, useState } from 'react'
import { MdDensitySmall } from 'react-icons/md'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'


const MenuContainer = () => {

    const[filter,setFilter] = useState('chairs')
    const[{woodenitems},dispatch]=useStateValue()

    useEffect(()=>{},[filter]);

  return (
  <section className='w-full my-6' id='menu'>
    <div className='w-full flex flex-col items-center justify-center'>
    <p className='text-lg font-semibold capitalize relative text-headingColor before:absolute 
      before:rounded-lg before:content before:w-52 before:h-1 before:-bottom-2
      before:left-0 before:bg-gradient-to-tr from-maincolor to-green-700 transition-all
      ease-in-out duration-100 mr-auto'>Impressive Collection For Your Dream Home</p>

      <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
        {categories && categories.map(category =>(
             <motion.div 
             whileTap={{scale:0.8}}
             key={category.id}
             className={`${filter === category.urlParamName ? 'bg-green-600' : 'bg-white'} group  w-24 min-w-[94px] h-28
             cursor-pointer rounded-lg drop-shadow-lg flex flex-col
             gap-3 items-center hover:bg-green-600 justify-center `}
             onClick={()=> setFilter(category.urlParamName)}>
                 <div className={`${filter === category.urlParamName ?   'bg-card' : 'bg-green-600'} w-10 h-10 rounded-full bg-maincolor group-hover:bg-white flex items-center justify-center`}>
                 <MdDensitySmall className={ `${ filter === category.urlParamName ? 'text-textColor' : 'text-white'}  group-hover:text-textColor text-lg`}/>
                 </div>
                 <p 
                 className={`${filter === category.urlParamName ? 'text-white': 'text-textColor'} text-sm text-textColor group-hover:text-white`}>
                 {category.name}
                 </p>
             </motion.div>
            ))}
      </div>

      <div className='w-full'>
        <RowContainer 
        flag={false} 
        data={woodenitems?.filter(n=>n.category  == filter)}/>
      </div>
    </div>
  </section>
  )
}

export default MenuContainer
