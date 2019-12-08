import IOfferingType from 'interfaces/offering-type.interface';

import OfferingType from '../models/offering-type.model';

export default class OfferingTypeController {
  public static async offeringType(offeringTypeId: string) {
    return await OfferingType.findOne({ offeringTypeId: offeringTypeId });
  }
  public static async offeringTypes() {
    return await OfferingType.find({});
  }
  public static async createOfferingType(offeringType: IOfferingType) {
    return await new OfferingType(offeringType).save();
  }
  public static async updateOfferingType(offeringType: IOfferingType) {
    return await OfferingType.findOneAndUpdate(
      { offeringTypeId: offeringType.offeringTypeId },
      {
        $set: offeringType
      },
      { upsert: true }
    );
  }
  public static async deleteOfferingType(offeringType: IOfferingType) {
    return await OfferingType.findOneAndRemove(offeringType);
  }
}
