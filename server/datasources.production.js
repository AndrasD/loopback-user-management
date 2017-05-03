module.exports = {
  db: {
    name: "db",
    connector: "memory"
  },
  mysqlDs: {
    name: "mysqlDs",
    connector: "mysql",
    url: process.env.CLEARDB_DATABASE_URL
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
