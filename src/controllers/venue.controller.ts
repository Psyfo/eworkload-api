import Venue from '../models/venue.model';

let venue = async (venueId: string) => {
  return await Venue.findOne({ venueId: venueId });
};
let venues = async () => {
  return await Venue.find({});
};
let addVenue = async (venue: any) => {
  const newVenue = new Venue(venue);

  return await newVenue.save();
};
let editVenue = async (venue: any) => {
  console.log(venue);

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
};
let deleteVenue = async (venue: any) => {
  return await Venue.findOneAndRemove(venue);
};

export { venue, venues, addVenue, editVenue, deleteVenue };
