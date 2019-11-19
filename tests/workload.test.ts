import mongoose from 'mongoose';

import dbConfig from '../src/config/keys.config';
import { logger } from '../src/config/logger';
import AcademicAdministrationWorkloadController from '../src/controllers/workload/academic-administration-workload.controller';

const AAWorkload = {
  userId: '21422869',
  academicAdministrationWorkloads: [],
  globalTarrif: 0,
  totalHoursPerUser: 0,
  percentageOfWorkFocusPerUser: 0,
  percentageOfAnnualHoursPerUser: 0,
  percentageOfTotalHoursPerUser: 0
};

describe('Workload Model Test', () => {
  beforeAll(async () => {
    const db = dbConfig.MongoURI;

    // MONGOOSE CONFIG
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.info('MongoDB connected...');
      })
      .catch(err => {
        logger.error(err);
      });
    mongoose.set('debug', false);
    mongoose.connection.on('error', error => logger.error(error));
  });

  it('get AA workload', async () => {
    let workload = await AcademicAdministrationWorkloadController.calculateAcademicAdministrationWorkload(
      '21422869'
    );
    expect(workload).toBeDefined();
  });
});
