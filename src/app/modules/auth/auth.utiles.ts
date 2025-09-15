import jwt, { SignOptions } from 'jsonwebtoken';

export const create_token = (
  jwt_payload: { id: string; role: string },
  secret: string,
  expiresIn: SignOptions['expiresIn'],
) => {
  return jwt.sign(jwt_payload, secret, {
    expiresIn,
  });
};
