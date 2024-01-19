import { useDispatch, useSelector } from 'react-redux';
import {
  extractDate,
  extractSubject,
  extractTime,
  renderEmail,
} from '../../utils/emailUtils';
import DOMPurify from 'dompurify';
import { AiOutlineUser, AiOutlineFullscreen } from 'react-icons/ai';
import StarEmail from '../list-email/components/starEmail';
import { FiTrash } from 'react-icons/fi';
import { PiWarningCircleLight } from 'react-icons/pi';
import { removeEmailByIndex } from '../../features/email/email.slice';
import { LuReply } from 'react-icons/lu';

import {} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SenderInfo from './components/senderInfo';

const MiniPreview = () => {
  const dispatch = useDispatch();

  const currentIndex = useSelector(
    (state) => state.email.thread.currentEmailByIndex,
  );

  const email = useSelector((state) => {
    const index = state.email.thread.currentEmailByIndex;

    if (index != null) return state.email.thread.list.at(index);

    return null;
  });

  if (!email)
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-1'>
        <PiWarningCircleLight size={30} />
        <p>Click on Email to read</p>
      </div>
    );

  return (
    <div className='no-scrollbar miniPreview overflow-y-scroll border-r-customLightBorder dark:border-r-customDarkShadow'>
      <div className='mx-4 my-3 px-2'>
        <div className='flex items-start justify-between gap-2'>
          <div className='text-xl'>{extractSubject(email.payload.headers)}</div>
          <Link to={'email/' + email.id}>
            <div className='flex cursor-pointer select-none items-center gap-2 rounded bg-unReadLightBackground px-2 py-1 active:scale-105 dark:bg-unReadDarkBackground'>
              <AiOutlineFullscreen />
              <div className='text-sm text-opacity-90'>Fullscreen</div>
            </div>
          </Link>
        </div>
        <div className='my-4 flex items-center justify-between'>
          <div className='flex items-start gap-2'>
            <SenderInfo headers={email.payload.headers} />
          </div>
          <div className='flex items-center gap-2'>
            <div>
              {extractDate(email.payload.headers)}
              {', '}
              {extractTime(email.payload.headers)}
            </div>
            <LuReply size={16} className='cursor-pointer active:scale-125' />
            <StarEmail iconSize={16} index={currentIndex} />
            <FiTrash
              className='cursor-pointer active:scale-125'
              size={16}
              onClick={() => dispatch(removeEmailByIndex(currentIndex))}
            />
          </div>
        </div>
      </div>
      <div className='mb-10 px-4'>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(renderEmail(email), {
              ADD_ATTR: ['target'],
            }),
          }}
        />
      </div>
    </div>
  );
};

export default MiniPreview;
