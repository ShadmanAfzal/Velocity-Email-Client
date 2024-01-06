import { useDrop } from 'react-dnd';
import { capitalize } from '@alphaomega/utils';
import { useDispatch } from 'react-redux';

import { ItemTypes } from '../../../utils/itemTypes';
import FolderIcons from '../../../components/folderIcons';
import {
  removeEmailByIndex,
  switchFolder,
} from '../../../features/email/email.slice';
import { isMovable } from '../../../utils/emailUtils';

const FolderTiles = ({ folderName, folderId, folderType, currentFolder }) => {
  const dispatch = useDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.EmailTile,
    canDrop: (_, __) => {
      return isMovable({ id: folderId, type: folderType });
    },
    drop: (item, _) => {
      dispatch(removeEmailByIndex(item.index));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver() && monitor.canDrop(),
    }),
  });

  const handleClick = (folder) => {
    if (folder === currentFolder) return;

    dispatch(switchFolder(folder));
  };

  return (
    <div
      className={`
        ${currentFolder === folderName ? 'dark:bg-gray-100 bg-gray-100' : ''} 
        ${
          isOver &&
          'bg-customLightHoverBackground dark:bg-customDarkHoverBackground dark:text-customLightOverText'
        }
        mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-full py-1 pl-2 active:scale-95
      `}
      ref={dropRef}
      onClick={() => handleClick(folderName)}
    >
      <FolderIcons folderName={folderName} />
      {capitalize(folderName.toLowerCase().replace('category_', ''))}
    </div>
  );
};

export default FolderTiles;
