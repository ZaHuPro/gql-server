import bcrypt from "bcrypt";
import { sign, verify, SignOptions, Algorithm } from 'jsonwebtoken';
import Log from "./logger";
import { HASHING_ROUNDS, PUBLIC_KEY, PRIVATE_KEY, PASS_PHRASE, AUTH_TOKEN_ALGORITHM, AUTH_TOKEN_EXPIRERS } from '../providers/Configs';

const authOptions: SignOptions = {
  expiresIn: Number(AUTH_TOKEN_EXPIRERS),
  algorithm: AUTH_TOKEN_ALGORITHM,
};

export const hashIt = (_plainPassword: string) => {
  try {
    return bcrypt.hashSync(_plainPassword, HASHING_ROUNDS);
  } catch (_err: any) {
    Log.error("encryption/hashIt :: ", _err);
    throw new Error(_err.toString());
  }
};

export const compareIt = (_plainPassword: string, _hashedPassword: string) => {
  try {
    return bcrypt.compareSync(_plainPassword, _hashedPassword);
  } catch (_err: any) {
    Log.error("encryption/compareIt :: ", _err);
    throw new Error(_err.toString());
  }
};

// sign with RSA SHA256
export const createJWT = (_payload: any) => {
  const privateSecret = {
    key: PRIVATE_KEY,
    passphrase: PASS_PHRASE,
  };

  return sign(_payload, privateSecret, authOptions);
};

export const verifyJWT = (token: string) => {
  try {
    return {
      success: true,
      data: verify(token, PUBLIC_KEY, authOptions),
    };
  } catch (err) {
    return {
      success: false,
      data: err,
    };
  }
};
