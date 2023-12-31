import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../service/emailServices';

const initialState = {
  folders: [],
  thread: {
    loading: false,
    error: false,
    currentFolder: 'INBOX',
    currentEmailByIndex: null,
    list: [],
  },
};

export const fetchFolders = createAsyncThunk(
  'email/folders',
  async (thunkAPI) => {
    try {
      const data = await services.listFolders();
      if (data) {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchEmailsByFolder = createAsyncThunk(
  'fetchEmailsByFolder',
  async (folder, thunkAPI) => {
    try {
      const data = await services.fetchEmailsByFolder(folder);
      if (data) {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    switchFolder(state, action) {
      state.thread.list = [];
      state.thread.currentFolder = action.payload;
    },
    toggleStar(state, action) {
      const { index, isStar } = action.payload;

      if (isStar) {
        const idx = state.thread.list?.at(index)?.labelIds.indexOf('STARRED');
        if (idx > -1) {
          state.thread.list?.at(index)?.labelIds.splice(idx, 1);
        }
      } else {
        state.thread.list?.at(index)?.labelIds.push('STARRED');
      }

      services.modifyLabels({
        messageId: state.thread.list.at(index).id,
        addLabels: isStar ? [] : ['STARRED'],
        removeLabels: isStar ? ['STARRED'] : [],
      });
    },

    markAsRead(state, action) {
      const index = action.payload;

      const idx = state.thread.list?.at(index)?.labelIds.indexOf('UNREAD');
      if (idx > -1) {
        state.thread.list?.at(index)?.labelIds.splice(idx, 1);
      }

      services.modifyLabels({
        messageId: state.thread.list.at(index).id,
        addLabels: [],
        removeLabels: ['UNREAD'],
      });
    },

    selectEmailToRead(state, action) {
      const index = action.payload;

      state.thread.currentEmailByIndex = index;
      emailSlice.caseReducers.markAsRead(state, action);
    },

    removeEmailByIndex(state, action) {
      const index = action.payload;
      state.thread.list.splice(index, 1);
      state.thread.currentEmailByIndex = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload;
    });
    builder.addCase(fetchEmailsByFolder.fulfilled, (state, action) => {
      if (action.meta.arg === state.thread.currentFolder) {
        state.thread.loading = false;
        state.thread.error = false;
        state.thread.list.push(...action.payload);
      }
    });

    builder.addCase(fetchEmailsByFolder.pending, (state, action) => {
      if (action.meta.arg === state.thread.currentFolder) {
        state.thread.error = false;
        state.thread.loading = true;
      }
    });
    builder.addCase(fetchEmailsByFolder.rejected, (state, action) => {
      if (action.meta.arg === state.thread.currentFolder) {
        state.thread.loading = false;
        state.thread.error = true;
      }
    });
  },
});

export const {
  toggleStar,
  selectEmailToRead,
  markAsRead,
  switchFolder,
  removeEmailByIndex,
} = emailSlice.actions;
export default emailSlice.reducer;
