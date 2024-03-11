/* eslint-disable react/prop-types */

const CheckoutBar = ({active}) => {
    return (
        <div className='pt-20 md:pt-4'>
            <div className='flex justify-center items-center'>
                <p className={`${active === 1 ? "bg-red-600 text-white" : "bg-red-300 text-black"} font-medium py-1.5 px-3 rounded-3xl`}>Shipping</p>
                <p className='text-red-300 md:hidden block'>----</p>
                <p className='text-red-300 hidden md:block'>------------------------</p>
                <p className={`${active === 2? "bg-red-600 text-white" : "bg-red-300 text-black"} font-medium py-1.5 px-3 rounded-3xl`}>Payment</p>
                <p className='text-red-300 md:hidden block'>----</p>
                <p className='text-red-300 hidden md:block'>------------------------</p>
                <p className={`${active ===3 ? "bg-red-600 text-white" : "bg-red-300 text-black"} font-medium py-1.5 px-3 rounded-3xl`}>Complete</p>
            </div>           
        </div>
    );
};

export default CheckoutBar;