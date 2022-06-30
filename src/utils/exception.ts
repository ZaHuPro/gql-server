import { Cluster }from 'cluster';
import Log from './logger';
import { Express, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { errorRespond, MESSAGE } from './responder';

export const clusterEventsHandler = (_cluster: Cluster) => {
  // Catch cluster listening event...
  _cluster.on('listening', (worker) => Log.info(`CLUSTER :: Cluster with ProcessID '${worker.process.pid}' Connected!`));

  // Catch cluster once it is back online event...
  _cluster.on('online', (worker) => Log.info(`CLUSTER :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `));

  // Catch cluster disconnect event...
  _cluster.on('disconnect', (worker) => Log.info(`CLUSTER :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`));

  // Catch cluster exit event...
  _cluster.on('exit', (worker, code, signal) => {
    Log.info(`CLUSTER :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`);
    // Ensuring a new cluster will start if an old one dies
    _cluster.fork();
  });
};

export const processEventsHandler = () => {
  // Catch the Process's uncaught-exception
  process.on('uncaughtException', (exception) => Log.error(exception));

  // Catch the Process's warning event
  process.on('warning', (warning) => Log.warn(warning));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  Log.error(err);
  return errorRespond(res, MESSAGE.unexpected_server_error, 500);
};

export const notFoundHandler = (_express: Express) => {
  _express.all('*', (req: Request, res: Response) => {
    // ip from client header or from express request object
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
    return errorRespond(res, MESSAGE.url_not_found, 404);
  });
  return _express;
};
