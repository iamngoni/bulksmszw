import { BulkSmsZw, BulkSmsZwApiResponse } from '../index';

const api = new BulkSmsZw({
  bulkSmsWebKey: 'key',
  bulkSmsWebName: 'name',
});

console.log('Trying to send message(s).');
api
  .send({
    message: 'Hi Ngonidzashe',
    credits: false,
    recipients: ['0777777777'],
  })
  .then(function (response: BulkSmsZwApiResponse) {
    console.log(response);
  });
