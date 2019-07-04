import { mergeTypes } from 'merge-graphql-schemas';

import Activity from './Activity';
import Block from './Block';
import Department from './Department';
import Discipline from './Discipline';
import Duty from './Duty';
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
import Enrollment from './Enrollment';
import WorkFocus from './WorkFocus';
import Workload from './Workload';

const typeDefs = [
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

export default mergeTypes(typeDefs, {
  all: true
});
