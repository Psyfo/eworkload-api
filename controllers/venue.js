import Venue from './../models/venue.js';

let venue = async venueId => {
  return await Venue.findOne({ venueId: venueId });
};

let venues = async () => {
  return await Venue.find({});
};

let addVenue = async venue => {
  const newVenue = new Venue(venue);

  return await newVenue.save();
};

let editVenue = async venue => {
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

let deleteVenue = async venue => {
  return await Venue.findOneAndRemove(venue);
};

export { venue, venues, addVenue, editVenue, deleteVenue };
