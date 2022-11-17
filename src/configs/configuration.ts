export const configuration = () => ({
  NODE_ENV: process.env.ENV,
  port: parseInt(process.env.PORT, 10) || 3001,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXP_H,
  },
});
