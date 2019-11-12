import { Document } from 'mongoose';

import IBlock from './block.interface';
import IDiscipline from './discipline.interface';
import IOfferingType from './offering-type.interface';
import IQualification from './qualification.interface';
import IUser from './user.interface';
import IVenue from './venue.interface';

interface IGroup {
  groupCode: string;
  enrolled: number;
  lecturerIds: string[];
  lectures?: IUser[];
  repeat: string;
  modularity: number;
}

export default interface IModule extends Document {
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
  groups: IGroup[];
  lecturedBy: string;
  enrolled: string;
  moderation: string;
}
