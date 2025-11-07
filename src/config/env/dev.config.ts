export default () => ({
  // Add your development environment variables here
  PORT: process.env.PORT,
  db: {
    url: process.env.DATABASE_URL,
  },
  tokenAccess: process.env.TOKEN_ACCESS,
  cloud: {
    url: process.env.CLOUD_URL,
    apiKey: process.env.CLOUD_API_KEY,
  },
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
});
