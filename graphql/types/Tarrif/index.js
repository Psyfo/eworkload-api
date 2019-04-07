const gql = require('graphql-tag');

module.exports = `
    type Tarrif {
        dutyId: String!,
        eventId: String!,
        description: String,
        appliedTarrif: String,
        minHours: Int,
        maxHours: Int,
        explanation: String,
        TRS: String,
        evidenceRequired: Boolean
    }

    type Query {
        tarrif(dutyId: String!, eventId: String!): Tarrif
        tarrifs: [Tarrif]
    }

    type Mutation {
        addTarrif(dutyId: String!,
            eventId: String!,
            description: String,
            appliedTarrif: String,
            minHours: Int,
            maxHours: Int,
            explanation: String,
            TRS: String,
            evidenceRequired: Boolean
            }): Tarrif
        editTarrif(dutyId: String!,
            eventId: String!,
            description: String,
            appliedTarrif: String,
            minHours: Int,
            maxHours: Int,
            explanation: String,
            TRS: String,
            evidenceRequired: Boolean
            }): Tarrif
        deleteTarrif(dutyId: String!,
            eventId: String!,
            description: String,
            appliedTarrif: String,
            minHours: Int,
            maxHours: Int,
            explanation: String,
            TRS: String,
            evidenceRequired: Boolean
            }): Tarrif
    }
`;