import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import EmailTiles from './components/emailTiles';
import { capitalize } from '@alphaomega/utils';

const ListEmails = () => {
  const emails = useSelector((state) => state.email.thread.list);
  const { currentFolder, loading, error } = useSelector(
    (state) => state.email.thread,
  );

  const emailTiles = emails.map((_, index) => {
    return <EmailTiles key={uuidv4()} index={index} />;
  });

  if (loading) {
    return (
      <div className='flex flex-col border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
        <div className='text-black dark:text-white my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-opacity-90 dark:border-b-customDarkShadow'>
          {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
        </div>
        <div className='emailLists flex'>
          <AiOutlineLoading3Quarters className='mx-auto animate-spin self-center' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
        <div className='text-black dark:text-white my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-opacity-90 dark:border-b-customDarkShadow'>
          {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
        </div>
        <div className='emailLists flex'>
          <div className='mx-auto self-center'>Error</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
      <div className='text-black dark:text-white my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-opacity-90 dark:border-b-customDarkShadow'>
        {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
      </div>
      <div className='emailLists no-scrollbar overflow-y-scroll'>
        {emailTiles}
        <div className='h-10' />
      </div>
    </div>
  );
};

export default ListEmails;
