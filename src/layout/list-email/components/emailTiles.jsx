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
        className={`mx-2 my-2 cursor-pointer rounded p-2 hover:shadow ${
          isDragging ? 'border-2 border-dashed border-gray-600' : ''
        } ${email.labelIds.includes('UNREAD') && 'bg-gray-100'}`}
        ref={drag}
        onClick={() => dispatch(selectEmailToRead(index))}
      >
        <div className={'flex flex-row items-center justify-between'}>
          <div className="flex flex-row items-center gap-2">
            <StarEmail index={index} />
            <div>{extractFrom(email.payload.headers)}</div>
          </div>
          <div>{extractDate(email.payload.headers)}</div>
        </div>
        <div>
          <div>{extractSubject(email.payload.headers)}</div>
          <div className="truncate text-black text-opacity-80">
            {email.snippet}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTiles;
