import { mergeTypes } from 'merge-graphql-schemas';

import Activity from './activity';
import Block from './block';
import Department from './department';
import Discipline from './discipline';
import Duty from './duty';
import Enrollment from './enrollment';
import Event from './event';
import Evidence from './evidence';
import Faculty from './faculty';
import Module from './module';
import OfferingType from './offering-type';
import Position from './position';
import Qualification from './qualification';
import Student from './student';
import User from './user';
import Venue from './venue';
import WorkFocus from './work-focus';
import Workload from './workload';
import AcademicAdministrationActivity from './activity/academic-administration-activity';
import CommunityInstructionActivity from './activity/community-instruction-activity';
import ExecutiveManagementActivity from './activity/executive-management-activity';
import FormalInstructionActivity from './activity/formal-instruction-activity';
import PersonnelDevelopmentActivity from './activity/personnel-development-activity';
import PublicServiceActivity from './activity/public-service-activity';
import ResearchActivity from './activity/research-activity';
import File from './upload';

const typeDefs = [
  Activity,
  Block,
  Department,
  Discipline,
  Duty,
  Enrollment,
  Event,
  Evidence,
  Faculty,
  Module,
  OfferingType,
  Position,
  Qualification,
  Student,
  User,
  Venue,
  WorkFocus,
  Workload,
  AcademicAdministrationActivity,
  CommunityInstructionActivity,
  ExecutiveManagementActivity,
  FormalInstructionActivity,
  PersonnelDevelopmentActivity,
  PublicServiceActivity,
  ResearchActivity,
  File
];

export default mergeTypes(typeDefs, {
  all: true
});
