import { Document } from 'mongoose';

import IBlock from './block.interface';
import IDiscipline from './discipline.interface';
import IOfferingType from './offering-type.interface';
import IQualification from './qualification.interface';
import IVenue from './venue.interface';

export default interface IModule extends Document {
  id: string;
  moduleId: string;
  blockId: string;
  block?: IBlock;
  offeringTypeId: string;
  offeringType?: IOfferingType;
  qualificationId: string;
  qualification?: IQualification;
  name: string;
  type: string;
  assessmentMethod: string;
  nqfLevel: number;
  disciplineId: string;
  discipline?: IDiscipline;
  venueId: string;
  venue?: IVenue;
  credits: number;
  stackId: string;
  studyPeriod: string;
  lecturedBy: string;
  studentsEnrolled: number;
  moderation: string;
}
