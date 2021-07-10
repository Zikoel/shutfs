import D from 'debug'

const debug = D('app:primary-adapters:http:routers:files')

const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

export const makeUseCase = () => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'shutfs@smocla.com',
          Name: 'shutfs-dev',
        },
        To: [
          {
            Email: 'alefontani9@gmail.com',
            Name: 'passenger 1',
          },
        ],
        Subject: 'Your email flight plan!',
        TextPart:
          'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
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
