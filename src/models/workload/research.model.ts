import mongoose from "mongoose";

const researchWorkloadSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  researchWorkloads: [
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
researchWorkloadSchema.post("save", async function(doc: any) {
  console.log("Research Workload created");
});

// INDEX
researchWorkloadSchema.index({ userId: 1 }, { unique: true });

// VIRTUALS
researchWorkloadSchema.virtual("research-activity", {
  ref: "ResearchActivity",
  localField: "activityId",
  foreignField: "activityId",
  justOne: true
});

const ResearchWorkload = mongoose.model(
  "ResearchWorkload",
  researchWorkloadSchema
);
export default ResearchWorkload;
