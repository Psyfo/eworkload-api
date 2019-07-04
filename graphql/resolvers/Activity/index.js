import Activity from '../../../models/activity';
import CommInstructionActivity from '../../../models/comm-instruction-activity';
import FormalInstructionActivity from '../../../models/formal-instruction-activity';
import PublicServiceActivity from '../../../models/public-service-activity';
import ResearchActivity from '../../../models/research-activity.js';
import SupervisionActivity from '../../../models/supervision-activity';
import * as workloadMethods from '../../../controllers/workload';

export default {
  Activity: {
    __resolveType(activity, context, info) {
      if (activity.commInstructionDescription) {
        return 'CommInstructionActivity';
      }

      if (activity.publicServiceDescription) {
        return 'PublicServiceActivity';
      }

      if (activity.moduleId) {
        return 'FormalInstructionActivity';
      }

      if (activity.researchUrl) {
        return 'ResearchActivity';
      }

      if (activity.supervisionRole) {
        return 'SupervisionActivity';
      }

      return null;
    },
  },
  Query: {
    activity: (root, args) => {
      return Activity.findOne({
        activityId: args.activityId,
      })
        .populate('duty')
        .populate('user')
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    activities: () => {
      return Activity.find({})
        .sort({
          userId: 'asc',
        })
        .populate('duty')
        .populate('user')
        .then(activities => {
          return activities;
        })
        .catch(err => {
          throw err;
        });
    },
    activitiesByDuty: (root, args) => {
      return Activity.find({
        dutyId: args.dutyId,
      })
        .sort({
          userId: 'asc',
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then(activities => {
          return activities;
        })
        .catch(err => {
          throw err;
        });
    },
    activitiesByUser: (root, args) => {
      return Activity.find({
        userId: args.userId,
      })
        .sort({
          userId: 'asc',
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then(activities => {
          return activities;
        })
        .catch(err => {
          throw err;
        });
    },
    unapprovedActivities: () => {
      return Activity.find({
        approvalStatus: false,
      })
        .sort({
          userId: 'asc',
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then(activities => {
          return activities;
        })
        .catch(err => {
          throw err;
        });
    },
    approvedActivities: () => {
      return Activity.find({
        approvalStatus: true,
      })
        .sort({
          userId: 'asc',
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then(activities => {
          return activities;
        })
        .catch(err => {
          throw err;
        });
    },
    formalInstructionActivity: (root, args) => {
      return FormalInstructionActivity.findOne({
        activityId: args.activityId,
      })
        .populate('user')
        .populate('coordinator')
        .populate('moderator')
        .populate('duty')
        .populate('module')
        .populate('moderator')
        .then(activity => {
          return activity;
        })
        .catch(error => {
          return error;
        });
    },
    formalInstructionActivities: () => {
      return FormalInstructionActivity.find({})
        .populate('user')
        .populate('coordinator')
        .populate('moderator')
        .populate('duty')
        .populate('module')
        .populate('moderator')
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    formalInstructionActivitiesByUser: (root, args) => {
      return FormalInstructionActivity.find({ userId: args.userId })
        .populate('user')
        .populate('duty')
        .populate('coordinator')
        .populate('moderator')
        .populate({
          path: 'module',
          model: 'Module',
          populate: {
            path: 'qualification',
            model: 'Qualification',
            populate: {
              path: 'department',
              model: 'Department',
              populate: {
                path: 'faculty',
                model: 'Faculty',
              },
            },
          },
        })
        .populate('moderator')
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    researchActivity: (root, args) => {
      return Activity.find({ activityId: args.activityId })
        .populate('user')
        .populate('duty')
        .then(activity => {
          return activity;
        })
        .catch(error => {
          return error;
        });
    },
    researchActivities: () => {
      return ResearchActivity.find({})
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    researchActivitiesByUser: () => {
      return ResearchActivity.find({ userId: userId })
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
    supervisionActivity: (root, args) => {
      return Activity.find({ activityId: args.activityId })
        .populate('user')
        .populate('duty')
        .populate('student')
        .then(activity => {
          return activity;
        })
        .catch(error => {
          return error;
        });
    },
    supervisionActivities: () => {
      return SupervisionActivity.find({})
        .then(result => {
          return result;
        })
        .catch(error => {
          return error;
        });
    },
  },
  Mutation: {
    // Comm-Insruction
    addCommInstructionActivity: (root, args) => {
      const newCommInstructionActivity = new CommInstructionActivity({
        userId: args.userId,
        dutyId: args.dutyId,
        approvalStatus: args.approvalStatus,
        commInstructionDescription: args.commInstructionDescription,
        evidenceId: args.evidenceId,
        workload: args.workload,
      });

      newCommInstructionActivity
        .save()
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    editCommInstructionActivity: (root, args) => {
      CommInstructionActivity.findOneAndUpdate(
        {
          activityId: args.activityId,
        },
        {
          $set: {
            approvalStatus: args.approvalStatus,
            commInstructionDescription: args.commInstructionDescription,
            evidenceId: args.evidenceId,
            workload: args.workload,
          },
        }
      )
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteCommInstructionActivity: (root, args) => {
      CommInstructionActivity.findOneAndRemove(args)
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },

    // Public Service
    addPublicServiceActivity: (root, args) => {
      const newPublicServiceActivity = new PublicServiceActivity({
        userId: args.userId,
        dutyId: args.dutyId,
        approvalStatus: args.approvalStatus,
        publicServiceDescription: args.publicServiceDescription,
        evidenceId: args.evidenceId,
        workload: args.workload,
      });

      newPublicServiceActivity
        .save()
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    editPublicServiceActivity: (root, args) => {
      PublicServiceActivity.findOneAndUpdate(
        {
          activityId: args.activityId,
        },
        {
          $set: {
            approvalStatus: args.approvalStatus,
            publicServiceDescription: args.publicServiceDescription,
            evidenceId: args.evidenceId,
            workload: args.workload,
          },
        }
      )
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    deletePublicServiceActivity: (root, args) => {
      PublicServiceActivity.findOneAndRemove(args)
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },

    // Research
    addResearchActivity: (root, args) => {
      const newResearchActivity = new ResearchActivity({
        userId: args.userId,
        dutyId: args.dutyId,
        approvalStatus: args.approvalStatus,
        researchType: args.researchType,
        researchUrl: args.researchUrl,
        workload: args.workload,
      });

      newResearchActivity
        .save()
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    editResearchActivity: (root, args) => {
      ResearchActivity.findOneAndUpdate(
        {
          activityId: args.activityId,
        },
        {
          $set: {
            approvalStatus: args.approvalStatus,
            researchType: args.researchType,
            researchUrl: args.researchUrl,
            workload: args.workload,
          },
        }
      )
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteResearchActivity: (root, args) => {
      ResearchActivity.findOneAndRemove(args)
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },

    // Formal Instruction
    addFormalInstructionActivity: async (root, args) => {
      console.log('Args:', args);
      console.log('Qualification ID:', args.qualificationId);

      let baseContactHours = await workloadMethods.calcBaseContact(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let coordinationHours = await workloadMethods.calcCoordination(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let studentSupportHours = await workloadMethods.calcStudentSupport(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let preparationTimeHours = await workloadMethods.calcPreparationTime(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let assessmentSettingHours = await workloadMethods.calcAssessmentSetting(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let examMarkingHours = await workloadMethods.calcExamMarking(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let coureworkMarkingHours = await workloadMethods.calcCourseworkMarking(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let feedbackHours = await workloadMethods.calcFeedback(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let formativeAssessment = await workloadMethods.calcFormativeAssessment(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let moderationHours = await workloadMethods.calcModeration(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let otherHours = await workloadMethods.calcTeachingOther(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
      let totalHours = await workloadMethods.calcTeachingTotal(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );

      let teachingPercentage = await workloadMethods.calcTeachingPercentage(
        args.userId,
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );

      const newFormalInstructionActivity = await new FormalInstructionActivity({
        userId: args.userId,
        dutyId: args.dutyId,
        moduleId: args.moduleId,
        blockId: args.blockId,
        offeringTypeId: args.offeringTypeId,
        qualificationId: args.qualificationId,
        baseContactHours: baseContactHours,
        coordinationHours: coordinationHours,
        studentSupportHours: studentSupportHours,
        preparationTimeHours: preparationTimeHours,
        assessmentSettingHours: assessmentSettingHours,
        examMarkingHours: examMarkingHours,
        courseworkMarkingHours: coureworkMarkingHours,
        feedbackHours: feedbackHours,
        formativeAssessmentHours: formativeAssessment,
        moderationHours: moderationHours,
        otherHours: otherHours,
        totalHours: totalHours,
        teachingPercentage: teachingPercentage,
      });
      console.log('Activity:', newFormalInstructionActivity);

      newFormalInstructionActivity
        .save()
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    editFormalInstructionActivity: (root, args) => {
      FormalInstructionActivity.findOneAndUpdate(
        {
          activityId: args.activityId,
        },
        {
          $set: {
            approvalStatus: args.approvalStatus,
            moduleId: args.moduleId,
            coordinatorId: args.coordinatorId,
            moderatorId: args.moderatorId,
            blockId: args.blockId,
            offeringTypeId: args.offeringTypeId,
            qualificationId: args.qualificationId,
          },
        }
      )
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteFormalInstructionActivity: (root, args) => {
      FormalInstructionActivity.findOneAndRemove(args)
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },

    // Supervision
    addSupervisionActivity: (root, args) => {
      const newSupervisionActivity = new SupervisionActivity({
        userId: args.userId,
        dutyId: args.dutyId,
        approvalStatus: args.approvalStatus,
        supervisionRole: args.supervisionRole,
        studentId: args.studentId,
        workload: args.workload,
      });

      newSupervisionActivity
        .save()
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    editSupervisionActivity: (root, args) => {
      SupervisionActivity.findOneAndUpdate(
        {
          activityId: args.activityId,
        },
        {
          $set: {
            approvalStatus: args.approvalStatus,
            supervisionRole: args.supervisionRole,
            studentId: args.studentId,
            workload: args.workload,
          },
        }
      )
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteSupervisionActivity: (root, args) => {
      SupervisionActivity.findOneAndRemove(args)
        .then(activity => {
          return activity;
        })
        .catch(err => {
          throw err;
        });
    },
  },
};
