import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShopActivationPage = () => {
    const {token} = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (token) {
        const activationId = async() => {
            try {
                const res = await axios.post("http://localhost:3000/api/shop/shop-activation", {activation_token: token});
                console.log(res);
            } catch (err) {
                console.log(err);
                setError(true);
            }
        }
        activationId();
    }
    }, []);

    return (
        <div className='h-screen w-full flex justify-center items-center text-lg font-medium'>
            {error ? (<p>Your token is expired</p>) : <p>Your shop is created successfully</p>}
        </div>
    );
};

export default ShopActivationPage;