import IFormalInstructionActivity from 'interfaces/activity/formal-instruction-activity.interface';

import { logger } from '../../config/logger';
import parameters from '../../config/parameters.config';
import GroupController from '../../controllers/group.controller';
import IGroup from '../../interfaces/group.interface';
import FormalInstructionActivity from '../../models/activity/formal-instruction-activity.model';
import WorkFocusController from '../work-focus.controller';
import WorkloadController from '../workload/workload.controller';

export default class FormalInstructionActivityController {
  year: string = new Date().getFullYear().toString();

  public static async formalInstructionActivity(activityId: string) {
    return await FormalInstructionActivity.findOne({ activityId: activityId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty')
      .populate({
        path: 'group',
        populate: {
          path: 'module',
          populate: [{ path: 'block' }, { path: 'offeringType' }, { path: 'qualification' }, { path: 'discipline' }]
        }
      });
  }
  public static async formalInstructionActivities() {
    return await FormalInstructionActivity.find({})
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty')
      .populate({
        path: 'group',
        populate: {
          path: 'module',
          populate: [
            { path: 'block' },
            { path: 'offeringType' },
            { path: 'qualification' },
            { path: 'discipline' },
            { path: 'venue' }
          ]
        }
      });
  }
  public static async formalInstructionActivitiesByUser(userId: string) {
    return await FormalInstructionActivity.find({ userId: userId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' },
          { path: 'department', model: 'Department' }
        ]
      })
      .populate('duty')
      .populate({
        path: 'group',
        populate: {
          path: 'module',
          populate: [
            { path: 'block' },
            { path: 'offeringType' },
            { path: 'qualification' },
            { path: 'discipline' },
            { path: 'venue' }
          ]
        }
      });
  }
  public static async formalInstructionActivitiesByGroup(groupId: string) {
    return await FormalInstructionActivity.find({ groupId: groupId })
      .populate({
        path: 'user',
        model: 'User',
        populate: [
          { path: 'disciplines', model: 'Discipline' },
          { path: 'position', model: 'Position' },
          { path: 'workFocus', model: 'WorkFocus' }
        ]
      })
      .populate('duty')
      .populate({
        path: 'group',
        populate: {
          path: 'module',
          populate: [
            { path: 'block' },
            { path: 'offeringType' },
            { path: 'qualification' },
            { path: 'discipline' },
            { path: 'venue' }
          ]
        }
      });
  }
  public static async createFormalInstructionActivity(activity: IFormalInstructionActivity) {
    return await new FormalInstructionActivity(activity).save();
  }
  public static async updateFormalInstructionActivity(activity: IFormalInstructionActivity) {
    return await FormalInstructionActivity.findOneAndUpdate(
      { activityId: activity.activityId },
      {
        $set: activity
      },
      { upsert: true }
    );
  }
  public static async deleteFormalInstructionActivity(activity: IFormalInstructionActivity) {
    return await FormalInstructionActivity.findOneAndRemove(activity);
  }
  public static async formalInstructionLectureWeeks(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    let lectureWeeks = parameters.lecture_weeks_semester;
    if (activity.group.module.blockId === parameters.annual) {
      lectureWeeks = parameters.lecture_weeks_annual;
    }

    return lectureWeeks;
  }
  public static async formalInstructionStudentsEnrolled(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;

    const students = activity.group.studentsEnrolled;
    return students;
  }
  public static async formalInstructionBaseContactHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (activity.group.module.credits / 4) * lectureWeeks; // * activity.group.repeat) / activity.group.modularity;
  }
  public static async formalInstructionCoordinationHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    let coordination: number = 0;
    if (activity.isCoordinator) {
      coordination = 5;
      if (students > 100) {
        coordination += (students - 100) / 40;
      }
    }
    return coordination;
  }
  public static async formalInstructionStudentSupportHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (0.1 * students * activity.group.module.credits) / lectureWeeks / activity.group.modularity;
  }
  public static async formalInstructionPreparationTimeHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const baseContactHours: number = await this.formalInstructionBaseContactHours(activityId);
    return (baseContactHours * (activity.group.module.nqfLevel - 4)) / activity.group.modularity;
  }
  public static async formalInstructionAssessmentSettingHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (
      (((10 * activity.group.module.credits) / lectureWeeks) * (activity.group.module.nqfLevel - 4)) /
      activity.group.modularity
    );
  }
  public static async formalInstructionExamMarkingHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (
      (0.25 * students * (activity.group.module.credits / lectureWeeks) * (activity.group.module.nqfLevel - 4)) /
      2 /
      activity.group.modularity
    );
  }
  public static async formalInstructionCourseworkMarkingHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (0.5 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
  }
  public static async formalInstructionFeedbackHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (1 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
  }
  public static async formalInstructionFormativeAssessmentHours(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const students: number = await this.formalInstructionStudentsEnrolled(activityId);
    const lectureWeeks: number = await this.formalInstructionLectureWeeks(activityId);
    return (0.4 * students * (activity.group.module.credits / lectureWeeks)) / activity.group.modularity;
  }
  public static async formalInstructionModerationHours(activityId: string) {
    // const activity: IFormalInstructionActivity = await this.formalInstructionActivity(activityId) as IFormalInstructionActivity;
    // const module:IModule = activity.module as IModule;
    // const students:number = await this.formalInstructionStudentsEnrolled(activityId);
    // const lectureWeeks:number = await this.formalInstructionLectureWeeks(activityId);
    // let moderation = 0;
    // if (activity.userId === module.moderatorId) {
    //   moderation = Math.round((0.1 * students * module.credits) / lectureWeeks) / activity.group.modularity;
    // }
    // return moderation;
  }
  public static async formalInstructionOtherHoursPerActivity(activityId: string) {
    return (
      (await this.formalInstructionCoordinationHours(activityId)) +
      (await this.formalInstructionStudentSupportHours(activityId)) +
      (await this.formalInstructionPreparationTimeHours(activityId)) +
      (await this.formalInstructionAssessmentSettingHours(activityId)) +
      (await this.formalInstructionExamMarkingHours(activityId)) +
      (await this.formalInstructionCourseworkMarkingHours(activityId)) +
      (await this.formalInstructionFeedbackHours(activityId)) +
      (await this.formalInstructionFormativeAssessmentHours(activityId))
    );
  }
  public static async formalInstructionTotalHoursPerActivity(activityId: string) {
    return (
      (await this.formalInstructionBaseContactHours(activityId)) +
      (await this.formalInstructionOtherHoursPerActivity(activityId))
    );
  }
  public static async formalInstructionTotalHoursPerUser(userId: string) {
    const activities: IFormalInstructionActivity[] = (await FormalInstructionActivity.find({
      userId: userId
    })) as IFormalInstructionActivity[];
    let activityHours: number = 0;
    // Cancel if no activities
    if (!activities) {
      return activityHours;
    }
    for (let activity of activities) {
      activityHours += await this.formalInstructionTotalHoursPerActivity(activity.activityId);
    }
    return activityHours;
  }
  public static async formalInstructionPercentageOfWorkFocusPerActivity(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const activityHours: number = await this.formalInstructionTotalHoursPerActivity(activityId);
    const workFocusHours: number = await WorkFocusController.teachingHours(activity.userId);
    return (activityHours / workFocusHours) * 100;
  }
  public static async formalInstructionPercentageOfAnnualHoursPerActivity(activityId: string) {
    const activityHours: number = await this.formalInstructionTotalHoursPerActivity(activityId);
    const annualHours = await parameters.annual_total_hours;
    return (activityHours / annualHours) * 100;
  }
  public static async formalInstructionPercentageOfTotalHoursPerActivity(activityId: string) {
    const activity: IFormalInstructionActivity = (await this.formalInstructionActivity(
      activityId
    )) as IFormalInstructionActivity;
    const activityHours: number = await this.formalInstructionTotalHoursPerActivity(activityId);
    const totalHours: number = await WorkloadController.totalHoursPerUser(activity.userId);
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async formalInstructionPercentageOfWorkFocusPerUser(userId: string) {
    const activities: IFormalInstructionActivity[] = (await this.formalInstructionActivitiesByUser(
      userId
    )) as IFormalInstructionActivity[];
    let sum: number = 0;
    for (let activity of activities) {
      sum += await this.formalInstructionPercentageOfWorkFocusPerActivity(activity.activityId);
    }
    return sum;
  }
  public static async formalInstructionPercentageOfAnnualHoursPerUser(userId: string) {
    const activities: IFormalInstructionActivity[] = (await this.formalInstructionActivitiesByUser(
      userId
    )) as IFormalInstructionActivity[];
    let sum: number = 0;
    for (let activity of activities) {
      sum += await this.formalInstructionPercentageOfAnnualHoursPerActivity(activity.activityId);
    }
    return sum;
  }
  public static async formalInstructionPercentageOfTotalHoursPerUser(userId: string) {
    const activityHours: number = await this.formalInstructionTotalHoursPerUser(userId);
    let totalHours: number = await WorkloadController.totalHoursPerUser(userId);
    if (totalHours === undefined) {
      throw new Error('Total hours is undefined');
    }
    return (activityHours / totalHours) * 100;
  }
  public static async isCoordinated(moduleId: string) {
    const groups: IGroup[] = (await GroupController.groupsByModule(moduleId)) as IGroup[];
    let coordinator = groups.map(async (group: IGroup) => {
      const activities: IFormalInstructionActivity[] = (await this.formalInstructionActivitiesByGroup(
        group.id
      )) as IFormalInstructionActivity[];
      return activities.find(activity => {});
    });
  }
}
