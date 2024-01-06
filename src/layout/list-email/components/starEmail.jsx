import { FaStar } from 'react-icons/fa';
import { SlStar } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { toggleStar } from '../../../features/email/email.slice';

const StarEmail = ({ index, iconSize = null, props }) => {
  const email = useSelector((state) => state.email.thread.list);
  const dispatch = useDispatch();

  if (email.at(index).labelIds.includes('STARRED'))
    return (
      <FaStar
        color="F4B400"
        size={iconSize}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleStar({ index, isStar: true }));
        }}
        className="cursor-pointer active:scale-125"
      />
    );

  return (
    <SlStar
      onClick={(e) => {
        e.stopPropagation();
        dispatch(toggleStar({ index, isStar: false }));
      }}
      size={iconSize}
      className="cursor-pointer active:scale-125"
    />
  );
};

export default StarEmail;
