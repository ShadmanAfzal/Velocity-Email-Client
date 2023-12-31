import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmailsByFolder } from '../../features/email/email.slice';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import EmailTiles from './components/emailTiles';

const ListEmails = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.email.thread.list);
  const { currentFolder, loading, error } = useSelector(
    (state) => state.email.thread,
  );

  useEffect(() => {
    dispatch(fetchEmailsByFolder(currentFolder));
  }, [currentFolder]);

  const emailTiles = emails.map((_, index) => {
    return <EmailTiles key={uuidv4()} index={index} />;
  });

  if (loading) {
    return (
      <div className="emailLists flex">
        <AiOutlineLoading3Quarters className="mx-auto animate-spin self-center" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="emailLists flex">
        <div className="mx-auto self-center">Error</div>
      </div>
    );
  }

  return (
    <div className="emailLists no-scrollbar overflow-y-scroll border-r">
      {emailTiles}
    </div>
  );
};

export default ListEmails;
