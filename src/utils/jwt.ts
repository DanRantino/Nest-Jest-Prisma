import { sign, verify, JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET_JWT;

export async function generateToken(payload: JwtPayload) {
  return sign(payload, secret, {
    expiresIn: '8h',
  });
}

export async function validateToken(payload: string): Promise<{
  valid: boolean;
  message?: string;
}> {
  let res;
  verify(payload, secret, (err, decoded) => {
    if (err) {
      res.valid = false;
      res.message = 'Repeat the login process!';
    }
    if (decoded) {
      res.valid = true;
    }
  });
  return res;
}
