import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Log from '../utils/logger';
import { MONGO_DB_URL } from './Configs';

export const loadDatabase = (): Promise<void> => new Promise((resolve, reject) => {
  const options: { [key: string]: boolean } = { useNewUrlParser: true, useUnifiedTopology: true };

  (mongoose).Promise = bluebird;

  Log.debug(`MONGO_DB :: Connecting to mongo server at: ${MONGO_DB_URL}`);
  mongoose.connect(MONGO_DB_URL, options, (error) => {
    // handle the error case
    if (error) {
      Log.error('MONGO_DB :: Failed to connect to the Mongo server!!', error);
      reject();
      process.exit(1);
    } else {
      Log.info('MONGO_DB :: Connected to mongo server');
      resolve();
    }
  });
});

export default mongoose;
