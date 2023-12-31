const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const emailServices = require('../services/emailServices');

const fetchFolders = async (req, res) => {
  const { access_token } = req.user;

  if (!access_token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  const folders = await emailServices.fetchFolders(access_token);

  if (folders) return res.status(StatusCodes.OK).send(folders);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

const fetchEmail = async (req, res) => {
  const { access_token } = req.user;

  const { folder } = req.params;

  if (!access_token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  const emails = await emailServices.fetchEmailByFolders(access_token, folder);

  if (emails) return res.status(StatusCodes.OK).send(emails);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

const modifyMessageLabels = async (req, res) => {
  const { access_token } = req.user;

  const { messageId } = req.params;

  const addLabels = req.body.addLabels ?? [];
  const removeLabels = req.body.removeLabels ?? [];

  await emailServices.modifyEmailLabels(
    access_token,
    messageId,
    addLabels,
    removeLabels
  );

  return res.status(200).send({ message: 'Updated' });
};

module.exports = {
  fetchEmail,
  fetchFolders,
  modifyMessageLabels,
};
