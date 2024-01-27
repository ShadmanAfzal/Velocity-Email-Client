import {
  AlertCircle,
  Folder,
  FolderCheck,
  FolderOpen,
  Forward,
  Inbox,
  Info,
  MailOpen,
  MessageCircle,
  PencilRuler,
  SendHorizontal,
  Star,
  Trash,
  UsersRound,
} from 'lucide-react';

const FolderIcons = ({ folderName }) => {
  const folder = folderName.toLocaleLowerCase();

  if (folder.includes('inbox')) return <Inbox size={16} />;

  if (folder.includes('sent')) return <Forward size={16} />;

  if (folder.includes('trash')) return <Trash size={16} />;

  if (folder.includes('spam')) return <AlertCircle size={16} />;

  if (folder.includes('star')) return <Star size={16} />;

  if (folder.includes('chat')) return <MessageCircle size={16} />;

  if (folder.includes('update')) return <Info size={16} />;

  if (folder.includes('social')) return <UsersRound size={16} />;

  if (folder.includes('draft')) return <FolderCheck size={16} />;

  if (folder.includes('read')) return <MailOpen size={16} />;

  return <Folder size={16} />;
};

export default FolderIcons;
