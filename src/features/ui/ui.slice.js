import { createSlice } from '@reduxjs/toolkit';
import {
  folderListExpandedView,
  folderListMinimizedView,
} from '../../utils/windowUtils';

const initialState = {
  isDark: false,
  isFolderMinimize: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    minimizeFolder(state) {
      const listElement = document.getElementById('emailFolders');
      const miniPreviewElement = document.getElementById('miniPreview');

      console.log({ listElement, miniPreviewElement });

      if (listElement && miniPreviewElement) {
        if (state.isFolderMinimize) {
          folderListExpandedView(listElement, miniPreviewElement);
        } else {
          folderListMinimizedView(listElement, miniPreviewElement);
        }

        state.isFolderMinimize = !state.isFolderMinimize;
      }
    },
    toggleTheme(state, action) {
      const currentLight = action.payload;
      const root = window.document.documentElement;
      const newTheme = currentLight ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      if (currentLight) {
        root.classList = ['dark'];
      } else {
        root.classList = ['light'];
      }
      state.isDark = action.payload;
    },
    setTheme(state) {
      const root = window.document.documentElement;
      const theme = localStorage.getItem('theme');
      const isDark = theme === 'dark';

      if (isDark) {
        root.classList = ['dark'];
      } else {
        root.classList = ['light'];
      }

      state.isDark = isDark;
    },
  },
});

export const { toggleTheme, minimizeFolder, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
