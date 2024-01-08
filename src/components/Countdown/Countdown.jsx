import React, { useEffect, useState } from 'react';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    function calculateTimeLeft (){
        const difference = +new Date("2024-01-15") - +new Date();
        let timeLeft = {};

        if(difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
              };
        }

        return timeLeft;
    }

    const timerComponents = Object.keys(timeLeft).map((interval, index) => {
        if (!timeLeft[interval]) {
          return null;
        }
    
        return (
          <span key={index} className="text-2xl font-semibold font-sans text-teal-600">
            {timeLeft[interval]} {interval}{" "}
          </span>
        );
      });

    return (
        <div className='my-3'>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-red-600 text-2xl">Time&#39;s Up</span>
      )}
    </div>
    );
};

export default Countdown;