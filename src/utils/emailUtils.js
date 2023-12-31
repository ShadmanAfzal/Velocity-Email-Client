import moment from 'moment';

export const extractName = (inputString) => {
  return inputString?.replace(/<.*?>/g, '')?.trim();
};

export const extractSubject = (headers) => {
  return headers.find((header) => header.name.toLowerCase() === 'subject')
    ?.value;
};

export const extractFrom = (headers) => {
  const from = headers.find(
    (header) => header.name.toLowerCase() === 'from',
  )?.value;

  return extractName(from) ?? from;
};

export const extractTo = (headers) => {
  const to = headers.find(
    (header) => header.name.toLowerCase() === 'to',
  )?.value;

  return extractName(to) ?? to;
};

export const extractDate = (headers) => {
  const date = headers.find(
    (header) => header.name.toLowerCase() === 'date',
  )?.value;

  const today = moment().startOf('day');

  const emailDate = moment(date).startOf('day');

  if (emailDate.isSame(today)) return 'Today';

  if (emailDate.diff(today, 'days') === -1) return 'Yesterday';

  return emailDate.format('DD MMM');
};

export const extractTime = (headers) => {
  const date = headers.find(
    (header) => header.name.toLowerCase() === 'date',
  )?.value;

  const today = moment();

  const emailDate = moment(date);

  if (
    emailDate.diff(today, 'hour') === 0 &&
    emailDate.diff(today, 'minutes') === 0
  )
    return today.diff(emailDate, 'seconds') + ' seconds ago';

  if (emailDate.diff(today, 'hours') === 0)
    return today.diff(emailDate, 'minutes') + ' minutes ago';

  return 'at ' + emailDate.format('hh:mm A');
};

export const extractEmailBody = (email) => {
  if (email.payload.body.size) {
    return atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
  }
  const htmlPart = email.payload.parts.find(
    (part) => part.mimeType === 'text/html',
  );

  const textPart = email.payload.parts.find(
    (part) => part.mimeType === 'text/plain',
  );

  if (htmlPart)
    return atob(htmlPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));

  return atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
};

export const renderEmail = (email) => {
  const parser = new DOMParser();
  const htmlText = extractEmailBody(email);

  let content = parser.parseFromString(htmlText, 'text/html');
  const anchors = content.getElementsByTagName('a');

  Array.from(anchors).forEach((a) => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noreferrer');
  });

  return content.body.innerHTML;
};

export const isMovable = ({ id, type }) => {
  const movableLabels = [
    'SPAM',
    'IMPORTANT',
    'TRASH',
    'STARRED',
    'CATEGORY_PERSONAL',
    'CATEGORY_PROMOTIONS',
    'CATEGORY_SOCIAL',
    'CATEGORY_FORUMS',
    'UNREAD',
  ];

  if (movableLabels.includes(id)) return true;

  if (type === 'user') return true;

  return false;
};
