import React from 'react';

const Hero = () => {
    return (
        <div className='min-h-[70vh] md:min-h-[80vh] mt-20 md:mt-0 bg-center md:bg-left w-full bg-no-repeat flex flex-col justify-center items-center' 
        style={{backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"}} >
            <div className='w-[90%] md:w-[60%] '>
                <p className='text-5xl font-medium text-gray-700 leading-[1.2]'>Best Collection for <br /> home Decoration</p>
                <p className='py-3 font-normal'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, amet. Nisi perspiciatis nemo cumque dolorem aperiam quas vitae architecto minus, libero, maxime ratione temporibus. Tenetur earum harum accusantium eius laborum!harum accusantium eius laborum!</p>
                <button className='bg-black w-fit text-white px-4 py-2 rounded-md font-medium my-2'>Shop now</button>
            </div>
        </div>
    );
};

export default Hero;