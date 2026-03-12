/* eslint-disable react/prop-types */
import { useState } from 'react';
import { RxCross2, RxMinus, RxPlus } from 'react-icons/rx';
import { toast } from 'react-toastify';

const SingleCart = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [value, setValue] = useState(data.qty);
    const totalPrice = data.discountPrice * value;

    const increment = (data) => {
        if (data?.stock <= value) {
            toast.error("Product stock limited");
        } else {
            setValue((prev) => prev + 1);
            const updatedData = { ...data, qty: value + 1 };
            quantityChangeHandler(updatedData);
        }
    };

    const decrement = (data) => {
        setValue((prev) => prev === 1 ? 1 : prev - 1);
        const updatedData = { ...data, qty: value === 1 ? 1 : value - 1 };
        quantityChangeHandler(updatedData);
    };

    return (
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50/60 transition-colors duration-150">
            
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={data?.images[0]} alt={data?.name} className="w-full h-full object-cover" />
            </div>

            
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{data?.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">US${data?.discountPrice} each</p>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">US${totalPrice.toFixed(2)}</p>
            </div>

            
            <div className="flex flex-col items-center gap-1">
                <button
                    onClick={() => increment(data)}
                    className="w-6 h-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center transition-colors duration-150 active:scale-90"
                >
                    <RxPlus size={13} color="white" />
                </button>
                <span className="text-xs font-bold text-gray-700 w-5 text-center">{value}</span>
                <button
                    onClick={() => decrement(data)}
                    className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-150 active:scale-90"
                >
                    <RxMinus size={13} color="#374151" />
                </button>
            </div>

            
            <button
                onClick={() => removeFromCartHandler(data)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors duration-150 flex-shrink-0"
            >
                <RxCross2 size={14} />
            </button>
        </div>
    );
};

export default SingleCart;