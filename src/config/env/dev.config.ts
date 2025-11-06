

export default () => ({
  // Add your development environment variables here
  PORT: process.env.PORT,
  db:{
    url: process.env.DATABASE_URL
  },
  tokenAccess: process.env.TOKEN_ACCESS,
  cloud:{
    url: process.env.CLOUD_URL,
    apiKey: process.env.CLOUD_API_KEY,
  },
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
});