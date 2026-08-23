/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const Countdown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (data) {
      if (
        typeof timeLeft.days === "undefined" &&
        typeof timeLeft.hours === "undefined" &&
        typeof timeLeft.minutes === "undefined" &&
        typeof timeLeft.seconds === "undefined"
      ) {
        axios.delete(
          `https://panda-shop-server-v4.up.railway.app/api/event/delete-event/${data?._id}`
        );
      }
    }

    return () => clearTimeout(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date(data?.end_date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const labels = { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" };

  const hasTime =
    Object.keys(timeLeft).length > 0 &&
    Object.values(timeLeft).some((v) => v > 0);

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      {hasTime ? (
        Object.keys(timeLeft).map((interval, index) => (
          <div key={index} className='flex flex-col items-center min-w-[56px]'>
            <div className='w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm'>
              <span className='text-xl font-black text-white tabular-nums leading-none'>
                {String(timeLeft[interval]).padStart(2, "0")}
              </span>
            </div>
            <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1'>
              {labels[interval]}
            </span>
          </div>
        ))
      ) : (
        <div className='flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl'>
          <span className='text-rose-500 text-sm font-bold'>
            ⏰ Time&apos;s Up!
          </span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
