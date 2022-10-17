import D from 'debug'

const debug = D('app:secondary-adapters:mail')

const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

export const sendMail = (
  senderMail: string,
  senderName: string,
  reciverMail: string, //potrebbe essere una lista
  reciverName: string, //potrebbe essere una lista
  subject: string,
  textPart: string,
  HTMLPart: string
) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: `${senderMail}`,
          Name: `${senderName}`,
        },
        To: [
          {
            Email: `${reciverMail}`,
            Name: `${reciverName}`,
          },
        ],
        Subject: `${subject}`,
        TextPart: `${textPart}`,
        HTMLPart: `${HTMLPart}`,
      },
    ],
  })

  request
    .then(result => {
      debug(result.body)
    })
    .catch(err => {
      debug('ERROR!!!!' + err.statusCode)
    })
}
