import Activity from '../../../models/activity/activity.model';
import ActivityController from './../../../controllers/activity/activity.controller';

export default {
  Activity: {
    __resolveType(activity: any) {
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
    activity: async (root: any, { activityId }: any) => {
      return await Activity.findOne({
        activityId: activityId
      })
        .populate('duty')
        .populate('user')
        .then((activity: any) => {
          return activity;
        })
        .catch((err: any) => {
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
        .then((activities: any[]) => {
          return activities;
        })
        .catch((err: any) => {
          throw err;
        });
    },
    activitiesByDuty: async (root: any, { dutyId }: any) => {
      return await Activity.find({
        dutyId: dutyId
      })
        .sort({
          userId: 'asc'
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then((activities: any[]) => {
          return activities;
        })
        .catch((err: any) => {
          throw err;
        });
    },
    activitiesByUser: async (root: any, { userId }: any) => {
      return await Activity.find({
        userId: userId
      })
        .sort({
          userId: 'asc'
        })
        .populate('module')
        .populate('duty')
        .populate('user')
        .then((activities: any[]) => {
          return activities;
        })
        .catch((err: any) => {
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
        .then((activities: any[]) => {
          return activities;
        })
        .catch((err: any) => {
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
        .then((activities: any[]) => {
          return activities;
        })
        .catch((err: any) => {
          throw err;
        });
    }
  },
  Mutation: {}
};
