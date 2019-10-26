import Activity from '../../../models/activity/activity';

export default {
  Activity: {
    __resolveType(activity) {
      if (activity.dutyId === '11') {
        return 'FormalInstructionActivity';
      }
      if (activity.dutyId === '12') {
        return 'CommInstructionActivity';
      }
      if (activity.dutyId === '20') {
        return 'ResearchActivity';
      }
      if (activity.dutyId === '30') {
        return 'PublicServiceActivity';
      }
      if (activity.dutyId === '46') {
        return 'AcademicAdministrationActivity';
      }
      if (activity.dutyId === '48') {
        return 'PersonnelDevelopmentActivity';
      }
      if (activity.dutyId === '61') {
        return 'ExecutiveManagementActivity';
      }

      return null;
    }
  },
  Query: {
    activity: async (root, args) => {
      return await Activity.findOne({
        activityId: args.activityId
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
    activities: async () => {
      return await Activity.find({})
        .sort({
          userId: 'asc'
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
    activitiesByDuty: async (root, args) => {
      return await Activity.find({
        dutyId: args.dutyId
      })
        .sort({
          userId: 'asc'
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
    activitiesByUser: async (root, args) => {
      return await Activity.find({
        userId: args.userId
      })
        .sort({
          userId: 'asc'
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
    activitiesByUnapproved: async () => {
      return await Activity.find({
        approvalStatus: false
      })
        .sort({
          userId: 'asc'
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
    activitiesByApproved: async () => {
      return await Activity.find({
        approvalStatus: true
      })
        .sort({
          userId: 'asc'
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
    }
  },
  Mutation: {}
};
