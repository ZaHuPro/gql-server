import { Response } from 'express';

export const successRespond = (res: Response, msg: string, code: number, data: any, payload: any = {}) => res
  .status(code)
  .json({ success: true, code, msg, data, ...payload })
  .end();

export const errorRespond = (res: Response, msg: string, code: number) => res
  .status(code)
  .json({ success: false, code, msg })
  .end();

interface IMESSAGE {
  [key: string]: string;
};

export const MESSAGE: IMESSAGE = {
  successful: 'successful',
  unsuccessful: 'unsuccessful',
  url_not_found: 'url_not_found',
  unexpected_error: 'unexpected_error',
  unexpected_server_error: 'unexpected_server_error',
  no_authorization: 'no_authorization',
  has_authorization: 'has_authorization',
  invalid_authorization: 'invalid_authorization',
  unexpected_authorization_error: 'unexpected_authorization_error',
  no_app_secret: 'no_app_secret',
  invalid_app_secret: 'invalid_app_secret',
  unexpected_app_secret_error: 'unexpected_app_secret_error',
  notify_success: 'notify_success',
  notify_failed: 'notify_failed',
};
