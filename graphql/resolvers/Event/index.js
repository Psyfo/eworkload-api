const Event = require('../../../models/event');

module.exports = {
    Query: {
        event: (root, args) => {
            return Event.findOne(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        events: () => {
            return Event.find({})
                .sort({
                    eventId: 'asc'
                })
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addEvent: (root, args) => {
            const newEvent = new Event({
                eventId: args.eventId,
                description: args.deleteEvent
            });

            return newEvent.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        editEvent: (root, args) => {
            return Event.findOneAndUpdate({
                    eventId: args.eventId
                }, {
                    $set: {
                        description: args.description
                    }
                })
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteEvent: (root, args) => {
            return Event.findOneAndRemove(args)
                .populate()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};