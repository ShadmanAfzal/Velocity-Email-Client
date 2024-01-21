import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../../features/email/email.slice';

import FolderTiles from './components/folderTiles';

import { RxPencil2 } from 'react-icons/rx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { minimizeFolder } from '../../features/ui/ui.slice';
import { CustomToolTip } from '../../components/customToolTip';

const Folders = () => {
  const dispatch = useDispatch();

  const { folders, thread } = useSelector((state) => state.email);

  const { isFolderMinimize, isDark } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  const folderItems = folders.map((folder) => {
    return (
      <FolderTiles
        key={folder.name}
        folderId={folder.id}
        folderType={folder.type}
        folderName={folder.name}
        currentFolder={thread.currentFolder}
        minimize={isFolderMinimize}
      />
    );
  });

  return (
    <div
      id='emailFolders'
      className='relative flex flex-col border-r border-customLightBorder dark:border-customDarkShadow'
    >
      <div className='no-scrollbar flex-1 overflow-y-scroll'>{folderItems}</div>
      <div
        className='absolute -right-3 bottom-14 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 dark:text-white'
        onClick={() => dispatch(minimizeFolder())}
      >
        {isFolderMinimize ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </div>
      <Link to='/compose'>
        <div
          className={`mb-2 flex cursor-pointer items-center border-t border-customLightBorder py-2 shadow dark:border-customDarkShadow dark:shadow-customDarkShadow
            ${!isFolderMinimize ? 'gap-2 px-2' : 'justify-center'}
          `}
          data-tooltip-id='compose-tooltip'
          data-tooltip-content='Compose'
          data-tooltip-place='left'
        >
          <RxPencil2 size={16} />
          {!isFolderMinimize ? 'Compose' : null}
        </div>
        <CustomToolTip id='compose-tooltip' />
      </Link>
    </div>
  );
};

export default Folders;
