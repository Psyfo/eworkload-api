import IAcademicAdministrationActivity from 'interfaces/activity/academic-administration-activity.interface';

interface IAcademicAdministrationWorkloadPerActivity {
  activity: IAcademicAdministrationActivity;
  totalHoursPerActivity: number;
  percentageOfWorkFocusPerActivity: number;
  percentageOfAnnualHoursPerActivity: number;
  percentageOfTotalHoursPerActivity: number;
}

export default interface IAcademicAdministrationWorkload {
  userId: string;
  academicAdministrationWorkloads: IAcademicAdministrationWorkloadPerActivity[];
  globalTarrif: number;
  totalHoursPerUser: number;
  percentageOfWorkFocusPerUser: number;
  percentageOfAnnualHoursPerUser: number;
  percentageOfTotalHoursPerUser: number;
}
