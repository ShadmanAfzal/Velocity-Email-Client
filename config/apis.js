const GMAIL_API_ENDPOINTS = {
  LIST_INBOX: () =>
    `https://gmail.googleapis.com/gmail/v1/users/me/labels?key=${process.env.API_KEY}`,
  EMAIL_FOLDER: (folder, limit) =>
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=${folder}&maxResults=${limit}&key=${process.env.API_KEY}`,
  EMAIL_BY_ID: (messageId) =>
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?key=${process.env.API_KEY}`,
  MODIFY_MESSAGE_LABEL: (messageId) =>
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify?key=${process.env.API_KEY}`,
};

module.exports = GMAIL_API_ENDPOINTS;
