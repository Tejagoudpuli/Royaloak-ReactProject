import React from 'react'
import Jumbo from '../images/1.png'
const HomeContainer = () => {
    return (
        
            <section className='grid grid-cols-1 md:grid-cols-2 pt-20 md:pt-16 gap-2 w-full ' id='home'>

                <div className='py-2 flex-1 flex flex-col items-start  justify-center gap-6'>
                    <p className='text-[2.5rem] lg:text-[5rem] font-bold tarcking-wide text-headingColor '>
                        Renovate Your <span className='text-maincolor text-[3rem] md:text-[5.5rem]'>HOME</span>
                    </p>
                    <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                        A home is incomplete without the fundamental furniture units. No matter how big or small is your apartment, space is not defined until you assemble furniture in it.
                        Wooden Store is here to give you the best experience of online shopping and provide you with the premium quality furniture
                    </p>
                    <button type='button' className='md:w-auto bg-maincolor w-full px-4 py-2 rounded-lg hover:bg-green-600 hover:shadow-lg transition-all ease-in-out duration-100'>Order now</button>
                </div>
                <div className='py-2  flex-1'>
                <img src={Jumbo} className="ml-auto h-420 w-full  lg:w-auto lg:h-510 " alt="erroe"></img>
                </div>

            </section>
        
    )
}

export default HomeContainer
