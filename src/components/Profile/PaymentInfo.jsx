import { AiOutlineDelete } from 'react-icons/ai';

const PaymentInfo = () => {
    return (
        <div className='px-4 py-6 w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-2xl font-medium'>Payment Methods</p>
                <button className='w-fit px-4 py-2 bg-black text-white rounded-md font-medium'>Add New</button>
            </div>
            <div className='flex items-center justify-between bg-white shadow-sm rounded-sm w-full h-[70px] px-10 my-4'>
                <div className='flex items-center'>
                    <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="" className='w-16' />
                    <p className='font-semibold ml-6'>Tanvir Ahmed</p>
                </div>
                <div className='flex items-center font-medium'>
                    <p>1234 **** **** ****</p>
                    <p className='ml-6'>08/2022</p>
                </div>
                <div>
                    <AiOutlineDelete size={22} className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;