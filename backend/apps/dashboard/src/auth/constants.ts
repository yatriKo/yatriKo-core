export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d',
};

export const bcryptConstants = {
  salt: Number(process.env.BCRYPT_SALT),
};
