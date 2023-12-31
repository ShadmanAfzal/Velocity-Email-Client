const express = require('express');
const controller = require('../controller/emailController');

const emailRouter = express.Router();

emailRouter.get('/listFolders', controller.fetchFolders);
emailRouter.get('/:folder', controller.fetchEmail);
emailRouter.post('/modify/:messageId', controller.modifyMessageLabels);

module.exports = emailRouter;
