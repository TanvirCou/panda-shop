import React from 'react';
import Countdown from '../Countdown/Countdown';

const EventCard = () => {
    return (
        <div className='w-full bg-white rounded-md shadow-sm px-4'>
            <div className='block lg:flex w-full'>

                <div className='w-full lg:w-1/2'>
                    <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
                </div>
                <div className='w-full lg:w-1/2 flex flex-col justify-center px-4'>
                    <p className='text-xl font-semibold '>IPhone pro max 8/256gb</p>
                    <p className='text-sm font-semibold py-2 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ducimus officia neque illo labore. Autem dolorum, consectetur accusantium recusandae itaque natus obcaecati nemo? Explicabo quisquam voluptatum molestias, adipisci blanditiis nam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nulla aut enim praesentium alias quod similique consequuntur, sit, aspernatur qui odit. Laudantium enim voluptates id odit illo dolore excepturi placeat!
                    </p>
                    <div className='flex items-center justify-between py-1'>
                        <div className='flex items-center'>
                            <p className='text-xl font-medium text-red-600 line-through'>$1200</p>
                            <p className='text-xl font-medium text-gray-600 px-2'>$1100</p> 
                        </div>
                        <p className='font-medium text-green-600'>720 sold</p>
                    </div>

                    <Countdown />

                    <div className='my-2'>
                        <button className='bg-black text-white font-medium px-3 py-1.5 rounded-md'>See Details</button>
                        <button className='bg-black text-white font-medium px-3 py-1.5 rounded-md mx-4'>Buy Bow</button>
                    </div>
                </div>   

            </div>           
        </div>
    );
};

export default EventCard;