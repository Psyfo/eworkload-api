import IUser from './user.interface';

interface IGroup {
  groupCode: string;
  enrolled: number;
  lecturerIds: string[];
  lectures?: IUser[];
  repeat: string;
  modularity: number;
}

export default interface IModule {
  moduleId: string;
  name: string;
  type: string;
  assessmentMethod: string;
  nqfLevel: string;
  qualificationId: string;
  offeringTypeId: string;
  disciplineId: string;
  venueId: string;
  blockId: string;
  credits: string;
  stackId: string;
  studyPeriod: string;
  groups: IGroup[];
  lecturedBy: string;
  enrolled: string;
  moderation: string;
}
