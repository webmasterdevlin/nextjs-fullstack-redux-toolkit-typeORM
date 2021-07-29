module.exports = {
  synchronize: false,
  type: "mysql",
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  options: {
    trustServerCertificate: true,
  },
};
