module.exports = {
  db: {
    name: "db",
    connector: "mysql",
    url: "mysql://b0ca368cbc0160:6ba3bc42@us-cdbr-iron-east-03.cleardb.net/heroku_5534148d103febe?reconnect=true"
  },
  emailDs: {
    name: "emailDs",
    connector: "mail",
    transports: [
      {
        type: "smtp",
        host: "smtp.sendgrid.net",
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: true
        },
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      }
    ]
  }
}
