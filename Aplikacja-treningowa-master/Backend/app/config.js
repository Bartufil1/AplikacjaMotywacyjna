const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.MONGODB_URI ||
    "mongodb+srv://Bartek:inzynierka2023@inzynierka.pnka94j.mongodb.net/?retryWrites=true&w=majority",
  JwtSecret: process.env.JWT_SECRET || "Secret",
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: 465,
  SMTP_USERNAME: "bartekinformatyka1407@gmail.com",
  SMTP_PASSWORD: "nbif xkrg myku kpvw",
};

export default config;
