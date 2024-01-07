import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../../features/email/email.slice';
import FolderTiles from './components/folderTiles';
import { RxPencil2 } from 'react-icons/rx';

import { Link } from 'react-router-dom';

const Folders = () => {
  const dispatch = useDispatch();

  const { folders, thread } = useSelector((state) => state.email);

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
      />
    );
  });

  return (
    <div className='emailFolders flex flex-col border-r border-customLightBorder dark:border-customDarkShadow'>
      <div className='no-scrollbar flex-1 overflow-y-scroll'>{folderItems}</div>
      <Link to='/compose'>
        <div className='mb-2 flex cursor-pointer items-center gap-2 border-t border-customLightBorder px-2 py-2 shadow dark:border-customDarkShadow dark:shadow-customDarkShadow'>
          <RxPencil2 size={16} />
          Compose
        </div>
      </Link>
    </div>
  );
};

export default Folders;
