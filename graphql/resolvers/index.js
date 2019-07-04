import { mergeResolvers } from 'merge-graphql-schemas';

import Activity from './Activity';
import Block from './Block';
import Department from './Department';
import Discipline from './Discipline';
import Duty from './Duty';
import Enrollment from './Enrollment';
import Event from './Event';
import Evidence from './Evidence';
import Faculty from './Faculty';
import Module from './Module';
import OfferingType from './OfferingType';
import Position from './Position';
import Qualification from './Qualification';
import Student from './Student';
import User from './User';
import Venue from './Venue';
import WorkFocus from './WorkFocus';
import Workload from './Workload';

const resolvers = [
  Block,
  User,
  Department,
  Discipline,
  Duty,
  Event,
  Evidence,
  Faculty,
  Module,
  OfferingType,
  Position,
  Qualification,
  Student,
  Activity,
  Venue,
  Enrollment,
  WorkFocus,
  Workload
];

export default mergeResolvers(resolvers);
