import { FaRegFolder } from 'react-icons/fa6';
import { RiSendPlaneLine, RiSpam3Line } from 'react-icons/ri';
import { FiTrash } from 'react-icons/fi';
import { SlStar } from 'react-icons/sl';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { RiGroupLine } from 'react-icons/ri';
import { BsFileEarmarkPlus } from 'react-icons/bs';

const FolderIcons = ({ folderName }) => {
  const folder = folderName.toLocaleLowerCase();

  if (folder.includes('inbox')) return <MdAlternateEmail />;

  if (folder.includes('sent')) return <RiSendPlaneLine />;

  if (folder.includes('trash')) return <FiTrash />;

  if (folder.includes('spam')) return <RiSpam3Line />;

  if (folder.includes('star')) return <SlStar />;

  if (folder.includes('chat')) return <IoChatbubbleOutline />;

  if (folder.includes('update')) return <BsInfoCircle />;

  if (folder.includes('social')) return <RiGroupLine />;

  if (folder.includes('draft')) return <BsFileEarmarkPlus />;

  return <FaRegFolder />;
};

export default FolderIcons;
