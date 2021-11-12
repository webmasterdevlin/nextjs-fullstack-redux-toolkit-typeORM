module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mysql: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: process.env.PORT,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
