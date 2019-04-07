import { mergeTypes } from 'merge-graphql-schemas';

import { default as Block } from './Block';
import { default as User } from './User';
import { default as Department } from './Department';
import { default as Discipline } from './Discipline';
import { default as Duty } from './Duty';
import { default as Event } from './Event';
import { default as Evidence } from './Evidence';
import { default as Faculty } from './Faculty';
import { default as LectureStack } from './LectureStack';
import { default as Module } from './Module';
import { default as OfferingType } from './OfferingType';
import { default as Position } from './Position';
import { default as Qualification } from './Qualification';
import { default as Student } from './Student';
import { default as Tarrif } from './Tarrif';
import { default as Venue } from './Venue';
import { default as Activity } from './Activity';

const typeDefs = [
  Block,
  User,
  Department,
  Discipline,
  Duty,
  Event,
  Evidence,
  Faculty,
  LectureStack,
  Module,
  OfferingType,
  Position,
  Qualification,
  Student,
  Activity
];

export default mergeTypes(typeDefs, {
  all: true
});
