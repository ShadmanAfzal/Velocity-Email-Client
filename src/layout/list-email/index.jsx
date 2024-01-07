import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import EmailTiles from './components/emailTiles';

const ListEmails = () => {
  const emails = useSelector((state) => state.email.thread.list);
  const { loading, error } = useSelector((state) => state.email.thread);

  const emailTiles = emails.map((_, index) => {
    return <EmailTiles key={uuidv4()} index={index} />;
  });

  if (loading) {
    return (
      <div className='emailLists flex border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
        <AiOutlineLoading3Quarters className='mx-auto animate-spin self-center' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='emailLists flex border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
        <div className='mx-auto self-center'>Error</div>
      </div>
    );
  }

  return (
    <div className='emailLists no-scrollbar overflow-y-scroll border-r border-r-customLightBorder dark:border-r-customDarkShadow'>
      {emailTiles}
    </div>
  );
};

export default ListEmails;
