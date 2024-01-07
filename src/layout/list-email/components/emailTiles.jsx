import StarEmail from './starEmail';
import { useDispatch, useSelector } from 'react-redux';
import {
  extractDate,
  extractFrom,
  extractSubject,
} from '../../../utils/emailUtils';
import { selectEmailToRead } from '../../../features/email/email.slice';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../utils/itemTypes';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

const EmailTiles = ({ index }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.EmailTile,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const email = useSelector((state) => state.email.thread.list.at(index));

  const dispatch = useDispatch();

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <div
        className={`mx-2 my-2 cursor-pointer rounded p-2 hover:shadow active:scale-95 dark:hover:shadow-customDarkShadow 
        ${isDragging && 'border-gray-600 border-2 border-dashed'} 
        ${
          email.labelIds.includes('UNREAD') &&
          'bg-unReadLightBackground dark:bg-unReadDarkBackground'
        }`}
        ref={drag}
        onClick={() => dispatch(selectEmailToRead(index))}
      >
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <StarEmail index={index} />
            <div>{extractFrom(email.payload.headers)}</div>
          </div>
          <div className='text-xs'>{extractDate(email.payload.headers)}</div>
        </div>
        <div>
          <div className='truncate'>
            {extractSubject(email.payload.headers)}
          </div>
          <div className='text-black truncate text-opacity-80 dark:text-customDarkText dark:text-opacity-80'>
            {email.snippet}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTiles;
