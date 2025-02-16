export default () => ({
  app: {
    name: process.env.APPNAME,
    version: process.env.APPVERSION,
    port: process.env.APP_PORT,
  },
  ai: {
    deepseek: process.env.DEEP_SEEK_ENDPOINT,
  },
  db: {
    mongo: process.env.MONGO_CONNECTION,
  },
});
