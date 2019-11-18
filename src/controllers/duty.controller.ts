import Duty from '../models/duty.model';
import IDuty from 'interfaces/duty.interface';

export default class DutyController {
  public static async duty(dutyId: string) {
    return await Duty.findOne({ dutyId: dutyId });
  }
  public static async duties() {
    return await Duty.find({});
  }
  public static async createDuty(duty: IDuty) {
    return await duty.save();
  }
  public static async updateDuty(duty: IDuty) {
    return await Duty.findOneAndUpdate(
      { dutyId: duty.dutyId },
      {
        $set: duty
      },
      { upsert: true }
    );
  }
  public static async deleteDuty(duty: IDuty) {
    return await Duty.findOneAndRemove(duty);
  }
}
