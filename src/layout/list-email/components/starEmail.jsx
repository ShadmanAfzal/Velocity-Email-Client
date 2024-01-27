import { useDispatch, useSelector } from 'react-redux';
import { toggleStar } from '../../../features/email/email.slice';
import { Star } from 'lucide-react';

const StarEmail = ({ index, iconSize = null }) => {
  const email = useSelector((state) => state.email.thread.list);
  const dispatch = useDispatch();

  if (email.at(index).labelIds.includes('STARRED'))
    return (
      <Star
        fill='#F4B400'
        color='#F4B400'
        size={iconSize}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleStar({ index, isStar: true }));
        }}
        className='cursor-pointer active:scale-125'
      />
    );

  return (
    <Star
      onClick={(e) => {
        dispatch(toggleStar({ index, isStar: false }));
      }}
      size={iconSize}
      className='cursor-pointer active:scale-125'
    />
  );
};

export default StarEmail;
