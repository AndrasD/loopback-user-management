module.exports = {
  restApiRoot: "/api",
  host: process.env.APPLICATION_HOST,
  port: 3000,
  remoting: {
    context: false,
    rest: {
      normalizeHttpPath: false,
      xml: false
    },
    json: {
      strict: false,
      limit: "100kb"
    },
    urlencoded: {
      extended: true,
      limit: "100kb"
    },
    cors: false,
    handleErrors: false
  },
  legacyExplorer: false
}
