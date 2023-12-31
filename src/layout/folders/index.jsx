import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../../features/email/email.slice';
import FolderTiles from './components/folderTiles';

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

  return <div className="emailFolders border-r">{folderItems}</div>;
};

export default Folders;
