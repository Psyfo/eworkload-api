const gql = require('graphql-tag');

export default `
    type Event {
        eventId: String!,
        description: String!
    }

    type Query {
        event(eventId: String!): Event
        events: [Event]
    }

    type Mutation {
        addEvent(eventId: String!, description: String!): Event
        editEvent(eventId: String, description: String): Event
        deleteEvent(eventId: String, description: String): Event
    }
`;