import { mergeResolvers } from 'merge-graphql-schemas';

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
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  })
};
const resolvers = [
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
  File,
  resolverMap
];

export default mergeResolvers(resolvers);
