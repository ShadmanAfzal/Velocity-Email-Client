import {
  extractFrom,
  extractTo,
  getAvatarText,
} from '../../../utils/emailUtils';

const SenderInfo = ({ headers }) => {
  return (
    <>
      <div className='bg-black dark:bg-white mx-auto flex aspect-square h-8 items-center justify-center rounded-full bg-opacity-5 dark:bg-opacity-5'>
        <div>{getAvatarText(headers)}</div>
      </div>
      <div className='flex flex-col'>
        <div>{extractFrom(headers)}</div>
        <div>To {extractTo(headers)}</div>
      </div>
    </>
  );
};

export default SenderInfo;
