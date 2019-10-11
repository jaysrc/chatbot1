const Dialogflow = require('dialogflow');
const Pusher = require('pusher');
//const getWeatherInfo = require('./weather');


const projectId = 'chatapp-jycbhq';
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD5TN6cAIKhhR+V\nWnlRb9jdEwwDNXAovJ5j+wDDwTirCRXFY4H3koiIuQSp1tD0W9PeRpDjamIhZ18y\nN/eZmQtvixUwbT5rHt6k+I6iMM3jTKWDbe05Pobaef9SVlC4AT2nn2FnA1ai4hnd\nnqO15wc5z7HVM5FiRMAK4YLtZbclvN1Ix/Wo7Oe0DDgvlwgTIoA8cDHlHhhTvLxe\nvDTItMo4owD4tTf00m2r917K1h2o+vEp/jbSNfeNRroegnn5dqbnXMDBkE4HrxBL\nXDjvLThvND0zKKZ1ewXhZoS5fsVNJWY1HdllzDb2TYZOzV1yT7Bvd5nqW0SaqIrK\nxfgMxGuLAgMBAAECggEABP8a6RKDi7wwzVwCWXT96jRjBb9w74gUPpm9wq6hNaBZ\nfNrJNI6NyPu4UbUZ/APJI8fTSJONwvCg8k832a69EW++rXlLCneUa8cFiM+kmL0l\nBhTSb9bGeiN+0AYl2QJBW5YwrBFfj6Urcosm6dLnDKwSetztOYR6Ot2ZM6vZt1pf\nDnq4sXKvr7voB2Nq6PDtqXWGZxnkAUEGZzIJToapBKyNaVKih+SqnXi3jZ61arwN\nkF9B1UfYu6JUPrvnqntIns8AjDlE3QSfNGWYhgJAa+I95h1N/dKbS1fb3FHj7gIE\nE8oeSsnhUSbAAHCnvPS8/+meOKEM56TmplhawoXlTQKBgQD/Lq+QsM9Inx/y6Ize\n4ov3kuxalZj6Vr6iUXWqSS92JGO/THVtLEeOy8Ws7+zr+0fFnYypw8YBceffgg1n\nclXOzsuSlZwSmBTa4UaHRTUd3ybOfW0z47b9r4bMBt3uZFurIincdqMHaVRQErsy\nucVcwfIwuZIKu+oEFraZwCj+9wKBgQD6GVvksUsaqc7KJCnGHHKOCzhxKK2JvUE2\nwaqfDD6SSMI2S6rq763BhDwFAulhu3I15JKk06PmOfUlDOKHGYHiT2hHj+Aj/fqj\n6yWYA6qlHA5BIaqqYhgCv1dAmuYsyEAdiTf97UaYTYVQgk0vxD0ny84VCx4ZFtDK\nFypXZ3kPDQKBgQC4agLS7BRBBU5Pe6Qih1JjrrhElowhjoLiR0BjudQk6xNy8kyC\ng1eLaNQIsLNlrwklVUCMh0EXVjweGJybP9OnS2dvHdPW1DVuIROZOniyh8xBuf8r\nWsup9inSVLwaRkjBGkVqYApdls8ptv+2Hu70o+zlLZbPTxJFtixsXKTD7QKBgQCZ\noW5Dg21BScJPhftrSRpNizL2wCgqDmm6+yiWXu0o6yzyMXUisGyqDVLZOTqn4H99\n/5TdT2zFBiFCyzF0EAUrQeAq5YSoV2HZw57qTIZMunk/JTEzTOK2/VbZxs1SAQjx\nm9MbVuAguq4EEKbdisyOX7GOV6/7dXp4Sdamrlc9GQKBgQDYW/vJbkAxzvemrftA\nilsRlgdE/nm/bhfjxG12dfRy60dRlZRIN3HED9kK8H+g1Hqf+Z7TPmuOaK0f9Q26\n3Sk6HHDd4BytIpMB9E/SjTjU35R5lGbCDjmMl3XWOVn1pMNdQo5Elssv6CDJ74Go\nQVrNVafqpAgEBLej7qNZlvipug==\n-----END PRIVATE KEY-----\n"',
    client_email: 'dialogflow-vqhaah@chatapp-jycbhq.iam.gserviceaccount.com',
  },
};

const pusher = new Pusher({
  appId: '873516',
  key: '73cc4fbfb90ab18d2378',
  secret: '139bb11b3c68e1298f5f',
  cluster: 'ap2',
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};

module.exports = processMessage;
