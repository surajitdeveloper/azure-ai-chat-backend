export default () => ({
  app: {
    name: process.env.APPNAME,
    version: process.env.APPVERSION,
    port: process.env.APP_PORT,
  },
  ai: {
    openai: process.env.OPENAI_ENDPOINT,
  },
  secretKey: process.env.OPEN_KEY,
});
