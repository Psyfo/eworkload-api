import IVenue from 'interfaces/venue.interface';

import Venue from '../models/venue.model';

export default class VenueController {
  public static async venue(venueId: string) {
    return await Venue.findOne({ venueId: venueId });
  }
  public static async venues() {
    return await Venue.find({});
  }
  public static async createVenue(venue: IVenue) {
    return await venue.save();
  }
  public static async updateVenue(venue: IVenue) {
    return await Venue.findOneAndUpdate(
      { venueId: venue.venueId },
      {
        venueId: venue.venueId,
        capacity: venue.capacity,
        campus: venue.campus,
        type: venue.type
      },
      { upsert: true }
    );
  }
  public static async deleteVenue(venue: IVenue) {
    return await Venue.findOneAndRemove(venue);
  }
}
