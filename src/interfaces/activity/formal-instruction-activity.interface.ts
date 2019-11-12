import IBlock from 'interfaces/block.interface';
import IModule from 'interfaces/module.interface';
import IOfferingType from 'interfaces/offering-type.interface';
import IQualification from 'interfaces/qualification.interface';

import IActivity from './activity.interface';

export default interface IFormalInstructionActivity extends IActivity {
  moduleId: string;
  module?: IModule;
  blockId: string;
  block?: IBlock;
  offeringTypeId: string;
  offeringType?: IOfferingType;
  qualificationId: string;
  qualification?: IQualification;
  isCoordinator: boolean;
}
