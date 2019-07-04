import FormalInstructionActivity from '../../../models/formal-instruction-activity';
import User from '../../../models/user';
import parameters from '../../../config/parameters';

export default {
  Query: {
    formalInstructionWorkload: async (root, args) => {
      let activities = await FormalInstructionActivity.find({
        userId: args.userId,
      });
      let workFocus = await User.find({ userId: args.userId });

      let totalBaseContact = 0;
      activities.forEach(element => {
        totalBaseContact += element.baseContactHours;
      });
      console.log(totalBaseContact);
      let totalOtherHours = 0;
      activities.forEach(element => {
        totalOtherHours += element.otherHours;
      });
      console.log(totalOtherHours);
      let totalOverallHours = 0;
      activities.forEach(element => {
        totalOverallHours += element.totalHours;
      });
      console.log(totalOverallHours);
      let percentageOfFocus = Math.round(
        (totalOverallHours / parameters.annual_total_hours) * 100
      );
      console.log(percentageOfFocus);
      let percentageOfTotal = Math.round(
        (totalOverallHours / parameters.annual_total_hours) * 100
      );
      console.log(percentageOfTotal);

      let payload = {
        totalBaseHours: totalBaseContact,
        totalOtherHours: totalOtherHours,
        totalOverallHours: totalOverallHours,
        percentageOfFocus: percentageOfFocus,
        percentageOfTotal: percentageOfTotal,
      };
      return payload;
    },
  },
  Mutation: {},
};
