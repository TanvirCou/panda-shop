import React from 'react';
import { MdOutlineTrackChanges } from 'react-icons/md';

const TrackOrderInfo = () => {
    const orders = [
        {
            _id: "2131237823sjdasjida",
            orderItems: [{
                name: "IPhone 14 pro max",
            }],
            totalPrice: 120,
            orderStatus: "Processing"
        },
        {
            _id: "2131237823sjdasjida",
            orderItems: [{
                name: "IPhone 14 pro max",
            }],
            totalPrice: 120,
            orderStatus: "Processing"
        },
    ];
    return (
        <div className='px-4 py-6 w-full'>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Order id</th>
                            <th>Status</th>
                            <th>Items Qty</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => (
                                <tr key={index} className='hover'>
                                    <td>
                                       {order._id}
                                    </td>
                                    <td>
                                        {order.orderStatus}
                                    </td>
                                    <td>
                                        {order.orderItems.length}
                                    </td>
                                    <td>
                                        {order.totalPrice}
                                    </td>
                                    <th>
                                        <MdOutlineTrackChanges size={20} className='cursor-pointer'/>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrackOrderInfo;