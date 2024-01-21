export const folderListMinimizedView = (listElement, miniPreviewElement) => {
  const documentWidth = screen.width;

  const oldListWindowWidth = documentWidth * 0.1;
  const oldMiniPreviewWidth = documentWidth * 0.55;

  const newListWindowWidth = documentWidth * 0.03;

  listElement.style.width = newListWindowWidth + 'px';
  miniPreviewElement.style.width =
    oldMiniPreviewWidth + oldListWindowWidth - newListWindowWidth + 'px';
};

export const folderListExpandedView = (listElement, miniPreviewWindow) => {
  const documentWidth = screen.width;

  listElement.style.width = documentWidth * 0.1 + 'px';
  miniPreviewWindow.style.width = documentWidth * 0.55 + 'px';
};
