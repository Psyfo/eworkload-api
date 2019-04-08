import Activity from '../../../models/activity';
import CommInstructionActivity from '../../../models/comm-instruction-activity';
import LectureActivity from '../../../models/lecture-activity';
import PublicServiceActivity from '../../../models/public-service-activity';
import ResearchActivity from '../../../models/research-activity.js';
import SupervisionActivity from '../../../models/supervision-activity';


export default {
    Activity: {
        __resolveType(activity, context, info) {
            if(activity.commInstructionDescription){
                return 'CommInstructionActivity'
            }

            if(activity.publicServiceDescription){
                return 'PublicServiceActivity'
            }

            if(activity.lectureStackId){
                return 'LectureActivity'
            }

            if(activity.researchUrl){
                return 'ResearchActivity'
            }

            if(activity.supervisionRole){
                return 'SupervisionActivity'
            }

            return null;
        }
    },
    Query: {
        activity: (root, args) => {
            return Activity.findOne({
                    acitivityId: args.activityId
                })
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        activities: () => {
            return Activity.find({})
                .sort({
                    userId: 'asc'
                })
                .then(activities => {
                    return activities;
                })
                .catch(err => {
                    throw err;
                })
        },
        activitiesByDuty: (root, args) => {
            return Activity.find({
                    dutyId: args.dutyId
                })
                .sort({
                    userId: 'asc'
                })
                .then(activities => {
                    return activities;
                })
                .catch(err => {
                    throw err;
                })
        },
        activitiesByUser: (root, args) => {
            return Activity.find({
                    userId: args.userId
                })
                .sort({
                    userId: 'asc'
                })
                .then(activities => {
                    return activities;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        // Comm-Insruction
        addCommInstructionActivity: (root, args) => {
            const newCommInstructionActivity = new CommInstructionActivity({
                userId: args.userId,
                dutyId: args.dutyId,
                approvalStatus: args.approvalStatus,
                commInstructionDescription: args.commInstructionDescription,
                evidenceId: args.evidenceId
            });

            newCommInstructionActivity.save()
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        editCommInstructionActivity: (root, args) => {
            CommInstructionActivity.findOneAndUpdate({
                    activityId: args.activityId
                }, {
                    $set: {
                        approvalStatus: args.approvalStatus,
                        commInstructionDescription: args.commInstructionDescription,
                        evidenceId: args.evidenceId
                    }
                })
                .then(activity => {
                    return activity
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
                evidenceId: args.evidenceId
            });

            newPublicServiceActivity.save()
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        editPublicServiceActivity: (root, args) => {
            PublicServiceActivity.findOneAndUpdate({
                    activityId: args.activityId
                }, {
                    $set: {
                        approvalStatus: args.approvalStatus,
                        publicServiceDescription: args.publicServiceDescription,
                        evidenceId: args.evidenceId
                    }
                })
                .then(activity => {
                    return activity
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
                researchUrl: args.researchUrl
            });

            newResearchActivity.save()
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        editResearchActivity: (root, args) => {
            ResearchActivity.findOneAndUpdate({
                    activityId: args.activityId
                }, {
                    $set: {
                        approvalStatus: args.approvalStatus,
                        researchType: args.researchType,
                        researchUrl: args.researchUrl
                    }
                })
                .then(activity => {
                    return activity
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

        // Lecture
        addLectureActivity: (root, args) => {
            const newLectureActivity = new LectureActivity({
                userId: args.userId,
                dutyId: args.dutyId,
                approvalStatus: args.approvalStatus,
                lectureStackId: args.lectureStackId
            });

            newLectureActivity.save()
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        editLectureActivity: (root, args) => {
            LectureActivity.findOneAndUpdate({
                    activityId: args.activityId
                }, {
                    $set: {
                        approvalStatus: args.approvalStatus,
                        lectureStackId: args.lectureStackId
                    }
                })
                .then(activity => {
                    return activity
                })
                .catch(err => {
                    throw err;
                });
        },
        deleteLectureActivity: (root, args) => {
            LectureActivity.findOneAndRemove(args)
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                });
        },

        // Lecture
        addSupervisionActivity: (root, args) => {
            const newSupervisionActivity = new SupervisionActivity({
                userId: args.userId,
                dutyId: args.dutyId,
                approvalStatus: args.approvalStatus,
                supervisionRole: args.supervisionRole,
                studentId: args.studentId
            });

            newSupervisionActivity.save()
                .then(activity => {
                    return activity;
                })
                .catch(err => {
                    throw err;
                })
        },
        editSupervisionActivity: (root, args) => {
            SupervisionActivity.findOneAndUpdate({
                    activityId: args.activityId
                }, {
                    $set: {
                        approvalStatus: args.approvalStatus,
                        supervisionRole: args.supervisionRole,
                        studentId: args.studentId
                    }
                })
                .then(activity => {
                    return activity
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
        }
    }
}