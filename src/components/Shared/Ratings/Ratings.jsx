import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BiSolidStarHalf } from 'react-icons/bi';

const Ratings = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <AiFillStar
                    key={i}
                    className='mr-2 cursor-pointer'
                    size={20}
                    color='orange' />
            )
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <BiSolidStarHalf
                    key={i}
                    className='mr-2 cursor-pointer'
                    size={25}
                    color='orange' />
            )
        } else {
            stars.push(
                <AiOutlineStar
                    key={i}
                    className='mr-2 cursor-pointer'
                    size={20}
                    color='orange' />
            )
        }
    }

    return (
        <div className='flex'>
            {stars}
        </div>
    );
};

export default Ratings;