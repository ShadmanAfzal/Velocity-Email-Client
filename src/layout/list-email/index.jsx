import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import EmailTiles from './components/emailTiles';
import { capitalize } from '@alphaomega/utils';
import { Loader2 } from 'lucide-react';

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
        <div className='my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-black text-opacity-90 dark:border-b-customDarkShadow dark:text-white'>
          {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
        </div>
        <div id='emailLists' className='flex'>
          <Loader2 className='mx-auto animate-spin self-center' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
        <div className='my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-black text-opacity-90 dark:border-b-customDarkShadow dark:text-white'>
          {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
        </div>
        <div id='emailLists' className='flex'>
          <div className='mx-auto self-center'>Error</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
      <div className='my-1 border-b border-b-customLightBorder px-2 text-xl font-bold text-black text-opacity-90 dark:border-b-customDarkShadow dark:text-white'>
        {capitalize(currentFolder.toLowerCase().replace('category_', ''))}
      </div>
      <div id='emailLists' className='no-scrollbar overflow-y-scroll'>
        {emailTiles}
        <div className='h-10' />
      </div>
    </div>
  );
};

export default ListEmails;
