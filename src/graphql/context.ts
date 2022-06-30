import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

const context = ({ req }: { req: Request }) => {
  const { authorization } = req.headers;
  try {
    if ( !authorization ) return undefined;
    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, "NearByChat_SECRET_KEY");
    return {
      id: decoded.id,
      email: decoded.email,
      phone: decoded.phone
    };

  } catch (error) {
    // console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

export default context;