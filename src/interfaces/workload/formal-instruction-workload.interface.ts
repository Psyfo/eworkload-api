import IFormalInstructionActivity from 'interfaces/activity/formal-instruction-activity.interface';
import IModule from 'interfaces/module.interface';
import IBlock from 'interfaces/block.interface';
import IOfferingType from 'interfaces/offering-type.interface';
import IQualification from 'interfaces/qualification.interface';
import { Document } from 'mongoose';

export interface IFormalInstructionWorkloadPerActivity {
  activity: IFormalInstructionActivity;
  module?: IModule;
  block?: IBlock;
  offeringType?: IOfferingType;
  qualification?: IQualification;
  studentsEnrolled: number;
  baseContactHours: number;
  coordinationHours: number;
  studentSupportHours: number;
  preparationTimeHours: number;
  assessmentSettingHours: number;
  examMarkingHours: number;
  courseworkMarkingHours: number;
  feedbackHours: number;
  formativeAssessmentHours: number;
  otherHoursPerActivity: number;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IFormalInstructionWorkload extends Document {
  userId: string;
  formalInstructionWorkloads: IFormalInstructionWorkloadPerActivity[];
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
