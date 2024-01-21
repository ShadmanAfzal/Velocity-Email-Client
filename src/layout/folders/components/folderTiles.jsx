import { useDrop } from 'react-dnd';
import { capitalize } from '@alphaomega/utils';
import { useDispatch, useSelector } from 'react-redux';

import { ItemTypes } from '../../../utils/itemTypes';
import { isMovable } from '../../../utils/emailUtils';
import FolderIcons from '../../../components/folderIcons';
import {
  removeEmailByIndex,
  switchFolder,
} from '../../../features/email/email.slice';
import { CustomToolTip } from '../../../components/customToolTip';

const FolderTiles = ({
  folderName,
  folderId,
  folderType,
  currentFolder,
  minimize,
}) => {
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

  const selectedStyle =
    currentFolder === folderName
      ? 'bg-gray-100 dark:bg-white dark:bg-opacity-10'
      : null;

  const isOverStyle = isOver
    ? 'bg-customLightHoverBackground dark:bg-customDarkHoverBackground dark:text-customLightOverText'
    : null;

  const formattedName = capitalize(
    folderName.toLowerCase().replace('category_', ''),
  );

  return (
    <div>
      <div
        className={`
        ${selectedStyle} 
        ${isOverStyle}
        mx-1 my-1 flex cursor-pointer items-center rounded-md py-1 active:scale-95
        ${minimize ? 'justify-center' : 'gap-2 px-2'}
      `}
        data-tooltip-id={formattedName}
        data-tooltip-content={formattedName}
        data-tooltip-place='left'
        ref={dropRef}
        onClick={() => handleClick(folderName)}
      >
        <FolderIcons folderName={folderName} />
        <div className={minimize ? 'opacity-0' : null}>
          {!minimize ? formattedName : '.'}
        </div>
      </div>
      <CustomToolTip id={formattedName} />
    </div>
  );
};

export default FolderTiles;
