import { Document } from 'mongoose';

import IAcademicAdministrationWorkload from './workload/academic-administration-workload.interface';
import ICommunityInstructionWorkload from './workload/community-instruction-workload.interface';
import IExecutiveManagementWorkload from './workload/executive-management-workload.interface';
import IFormalInstructionWorkload from './workload/formal-instruction-workload.interface';
import IPersonnelDevelopmentWorkload from './workload/personnel-development-workload.interface';
import IPublicServiceWorkload from './workload/public-service-workload.interface';
import IResearchWorkload from './workload/research-workload.interface';
import ISupervisionWorkload from './workload/supervision-workload.interface';

export default interface IWorkload extends Document {
  userId: string;
  year: string;
  workFocusName: string;
  academicAdministrationWorkload: IAcademicAdministrationWorkload;
  communityInstructionWorkload: ICommunityInstructionWorkload;
  executiveManagementWorkload: IExecutiveManagementWorkload;
  formalInstructionWorkload: IFormalInstructionWorkload;
  personnelDevelopmentWorkload: IPersonnelDevelopmentWorkload;
  publicServiceWorkload: IPublicServiceWorkload;
  researchWorkload: IResearchWorkload;
  supervisionWorkload: ISupervisionWorkload;
}
