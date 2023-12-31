const { default: axios } = require('axios');
const GMAIL_API_ENDPOINTS = require('../config/apis');
const { data } = require('autoprefixer');

const fetchFolders = async (access_token) => {
  const url = GMAIL_API_ENDPOINTS.LIST_INBOX();

  const response = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  return response.data?.labels ?? [];
};

const fetchEmailByFolders = async (access_token, folder) => {
  try {
    const emails = [];

    const url = GMAIL_API_ENDPOINTS.EMAIL_FOLDER(folder, 10);

    console.log({ url });

    const response = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });

    for (const message of response.data.messages) {
      emails.push(await fetchEmailById(access_token, message.id));
    }

    return emails;
  } catch (error) {
    console.log('Error occured while fetching emails by folder', error.message);
  }
};

const fetchEmailById = async (access_token, messageId) => {
  try {
    const url = GMAIL_API_ENDPOINTS.EMAIL_BY_ID(messageId);

    const response = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error occured while fetching emails by Id', error.message);
  }
};

const modifyEmailLabels = async (
  access_token,
  messageId,
  addLabels,
  removeLabels
) => {
  try {
    const url = GMAIL_API_ENDPOINTS.MODIFY_MESSAGE_LABEL(messageId);

    const response = await axios.post(
      url,
      {
        addLabelIds: addLabels,
        removeLabelIds: removeLabels,
      },
      {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      }
    );
  } catch (error) {
    console.log('Error occured while updating labels', error.message);
  }
};

module.exports = {
  fetchFolders,
  fetchEmailById,
  fetchEmailByFolders,
  modifyEmailLabels,
};
