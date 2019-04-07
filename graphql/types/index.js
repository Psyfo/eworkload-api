const mergeTypes = require('merge-graphql-schemas').mergeTypes;

const Block = require('./Block');
const User = require('./User');
const Department = require('./Department');
const Discipline = require('./Discipline');
const Duty = require('./Duty');
const Event = require('./Event');
const Evidence = require('./Evidence');
const Faculty = require('./Faculty');
const LectureStack = require('./LectureStack');
const Module = require('./Module');
const OfferingType = require('./OfferingType');
const Position = require('./Position');
const Qualification = require('./Qualification');
const Student = require('./Student');
const Tarrif = require('./Tarrif');
const Venue = require('./Venue');
const Activity = require('./Activity');

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

module.exports = mergeTypes(typeDefs, {
    all: true
});