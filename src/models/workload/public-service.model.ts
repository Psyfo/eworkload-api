import mongoose from "mongoose";

const publicServiceWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  publicServiceWorkloads: [
    {
      activity: {
        type: mongoose.Schema.Types.Mixed
      },
      totalHoursPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfWorkFocusPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfAnnualHoursPerActivity: {
        type: Number,
        default: 0
      },
      percentageOfTotalHoursPerActivity: {
        type: Number,
        default: 0
      }
    }
  ],
  globalTarrif: {
    type: Number,
    default: 0
  },
  totalHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfWorkFocusPerUser: {
    type: Number,
    default: 0
  },
  percentageOfAnnualHoursPerUser: {
    type: Number,
    default: 0
  },
  percentageOfTotalHoursPerUser: {
    type: Number,
    default: 0
  }
});

// HOOKS
publicServiceWorkloadSchema.post("save", async function(doc: any) {
  console.log("Public Service Workload created");
});

// INDEX
publicServiceWorkloadSchema.index({ userId: 1 }, { unique: true });

// VIRTUALS
publicServiceWorkloadSchema.virtual("public-service-activity", {
  ref: "PublicServiceActivity",
  localField: "activityId",
  foreignField: "activityId",
  justOne: true
});

const PublicServiceWorkload = mongoose.model(
  "PublicServiceWorkload",
  publicServiceWorkloadSchema
);
export default PublicServiceWorkload;
