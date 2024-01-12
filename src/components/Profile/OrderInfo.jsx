import React from 'react';

const OrderInfo = ({ active }) => {
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
                        <tr className="bg-gray-200 rounded-[4px]">
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
                                        <button className="btn btn-ghost btn-xs">Details</button>
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

export default OrderInfo;