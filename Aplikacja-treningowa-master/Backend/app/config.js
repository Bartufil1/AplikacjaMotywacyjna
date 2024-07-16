const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.MONGODB_URI ||
  JwtSecret: process.env.JWT_SECRET || "Secret",
  SMTP_HOST: ,
  SMTP_PORT: ,
  SMTP_USERNAME: ",
  SMTP_PASSWORD: ,
};

export default config;
