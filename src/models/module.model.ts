import mongoose from 'mongoose';

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
    groups: [
      {
        groupCode: {
          type: String
        },
        enrolled: {
          type: Number
        },
        lecturerIds: [
          {
            type: String,
            ref: 'User'
          }
        ],
        repeat: {
          type: Number,
          default: 1
        }
      }
    ],
    lecturedBy: {
      type: String
    },
    enrolled: {
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
    collection: 'modules',
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// Index
moduleSchema.index(
  { moduleId: 1, blockId: 1, offeringTypeId: 1, qualificationId: 1 },
  { unique: true }
);

// Virtuals
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
moduleSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
});
moduleSchema.virtual('coordinator', {
  ref: 'User',
  localField: 'coordinatorId',
  foreignField: 'userId',
  justOne: true
});
moduleSchema.virtual('moderator', {
  ref: 'User',
  localField: 'moderatorId',
  foreignField: 'userId',
  justOne: true
});
moduleSchema.virtual('lecturers', {
  ref: 'User',
  localField: 'lecturerIds',
  foreignField: 'userId',
  justOne: false
});

const Module = mongoose.model('Module', moduleSchema);
export default Module;
