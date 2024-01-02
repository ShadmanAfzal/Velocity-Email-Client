import { useDispatch, useSelector } from 'react-redux';
import {
  extractDate,
  extractFrom,
  extractSubject,
  extractTime,
  extractTo,
  renderEmail,
} from '../../utils/emailUtils';
import DOMPurify from 'dompurify';
import { AiOutlineUser } from 'react-icons/ai';
import StarEmail from '../list-email/components/starEmail';
import { FiTrash } from 'react-icons/fi';
import { PiWarningCircleLight } from 'react-icons/pi';
import { removeEmailByIndex } from '../../features/email/email.slice';

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
      <div className="mx-auto flex flex-col items-center justify-center gap-1">
        <PiWarningCircleLight size={30} />
        <p>Click on Email to read</p>
      </div>
    );

  return (
    <div className="miniPreview border- overflow-y-scroll border-r">
      <div className="mx-4 my-3 px-2">
        <div className="flex items-center justify-between">
          <div className="text-xl">{extractSubject(email.payload.headers)}</div>
        </div>
        <div className="my-2 flex items-center justify-between">
          <div className="flex items-start gap-2">
            <AiOutlineUser size={18} className="cursor-pointer" />
            <div className="flex flex-col">
              <div>{extractFrom(email.payload.headers)}</div>
              <div>To {extractTo(email.payload.headers)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              {extractDate(email.payload.headers)}
              {', '}
              {extractTime(email.payload.headers)}
            </div>
            <StarEmail iconSize={14} index={currentIndex} />
            <FiTrash
              className="cursor-pointer active:scale-125"
              size={14}
              onClick={() => dispatch(removeEmailByIndex(currentIndex))}
            />
          </div>
        </div>
      </div>
      <div
        className="px-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(renderEmail(email), {
            ADD_ATTR: ['target'],
          }),
        }}
      />
    </div>
  );
};

export default MiniPreview;
