export default () => {
  const bcryptSalt = Number(process.env.BCRYPT_SALT);

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  return {
    jwtSecret: process.env.JWT_SECRET,
    bcryptSalt: isNaN(bcryptSalt) ? 10 : bcryptSalt,
  };
};
