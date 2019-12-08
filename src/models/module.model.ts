import IModule from 'interfaces/module.interface';
import mongoose from 'mongoose';

import GroupController from '../controllers/group.controller';
import IGroup from 'interfaces/group.interface';

const moduleSchema = new mongoose.Schema(
  {
    moduleId: {
      type: String,
      unique: false,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true
    },
    assessmentMethod: {
      type: String,
      trim: true
    },
    nqfLevel: {
      type: String,
      trim: true
    },
    qualificationId: {
      type: String,
      trim: true,
      ref: 'Qualification'
    },
    offeringTypeId: {
      type: String,
      unique: false,
      trim: true,
      ref: 'OfferingType'
    },
    disciplineId: {
      type: String,
      trim: true,
      ref: 'Discipline'
    },
    venueId: {
      type: String,
      ref: 'Venue'
    },
    blockId: {
      type: String,
      unique: false,
      ref: 'Block'
    },
    credits: {
      type: Number
    },
    stackId: {
      type: String
    },
    studyPeriod: {
      type: String
    },
    lecturedBy: {
      type: String,
      ref: 'Department'
    },
    enrolled: {
      type: Number
    },
    studentsEnrolled: {
      type: Number
    },
    moderation: {
      type: String
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// INDEX
moduleSchema.index({ moduleId: 1, blockId: 1, offeringTypeId: 1, qualificationId: 1 }, { unique: true });

// HOOKS
// Add group by default
moduleSchema.post('save', async function(doc) {
  const module: IModule = doc as IModule;
  const newGroup: IGroup = {
    groupId: 'A',
    moduleId: module.id,
    studentsEnrolled: module.studentsEnrolled,
    modularity: 1
  } as IGroup;
  // create default group
  await GroupController.createGroup(newGroup);
});

// VIRTUALS
moduleSchema.virtual('discipline', {
  ref: 'Discipline',
  localField: 'disciplineId',
  foreignField: 'disciplineId',
  justOne: true
});
moduleSchema.virtual('offeringType', {
  ref: 'OfferingType',
  localField: 'offeringTypeId',
  foreignField: 'offeringTypeId',
  justOne: true
});
moduleSchema.virtual('qualification', {
  ref: 'Qualification',
  localField: 'qualificationId',
  foreignField: 'qualificationId',
  justOne: true
});
moduleSchema.virtual('venue', {
  ref: 'Venue',
  localField: 'venueId',
  foreignField: 'venueId',
  justOne: true
});
moduleSchema.virtual('block', {
  ref: 'Block',
  localField: 'blockId',
  foreignField: 'blockId',
  justOne: true
});
moduleSchema.virtual('lectured-by', {
  ref: 'Department',
  localField: 'lecturedBy',
  foreignField: 'departmentId',
  justOne: true
});
moduleSchema.virtual('moderator', {
  ref: 'User',
  localField: 'moderatorId',
  foreignField: 'userId',
  justOne: true
});

const Module = mongoose.model('Module', moduleSchema);
export default Module;
