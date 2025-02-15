import jwt, { SignOptions } from "jsonwebtoken";

const createToken = (
  data: Record<string, unknown>,
  secret: string,
  expiresIn: string
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(data, secret, options);
};

export default createToken;
