import axios from 'axios';

const modifyLabels = async ({ messageId, addLabels, removeLabels }) => {
  try {
    await axios.post(`email/modify/${messageId}`, {
      addLabels: addLabels,
      removeLabels: removeLabels,
    });
  } catch (error) {
    console.log('Error occured while updating labels', error);
  }
};

const listFolders = async () => {
  const response = await axios.get('/email/listFolders');
  return await response.data;
};

const fetchEmailsByFolder = async (folder) => {
  const response = await axios.get(`/email/${folder}`);
  return await response.data;
};

export default {
  modifyLabels,
  listFolders,
  fetchEmailsByFolder,
};
