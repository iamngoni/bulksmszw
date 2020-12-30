import BulkSmsZw from '../bulksms';

const api = new BulkSmsZw({
  bulkSmsWebKey: '',
  bulkSmsWebName: ''
});

console.log("Trying to send message(s).");
api.send({
  message: 'Hi Ngonidzashe',
  credits: false,
  recipients: ['0777777777']
}).then(function (response) {
  console.log(response);
});