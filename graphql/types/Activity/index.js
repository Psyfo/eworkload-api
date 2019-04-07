const gql = require('graphql-tag');

module.exports = `

    interface Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
    }

    type CommInstructionActivity implements Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
        description: String!,
        evidenceId: String
        evidence: Evidence
    }

    type PublicServiceActivity implements Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
        description: String!,
        evidenceId: String,
        evidence: Evidence
    }

    type LectureActivity implements Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
        lectureStackId: String!,
        lectureStack: LectureStack
    }

    type ResearchActivity implements Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
        researchType: String!,
        researchUrl: String!
    }

    type SupervisionActivity implements Activity {
        activityId: String!,
        userId: String!,
        user: User,
        dutyId: String!,
        duty: Duty,
        approvalStatus: Boolean
        supervisionRole: String!,
        studentId: String!
        student: Student
    }

    type Query {
        activity(activityId: String!): Activity
        activities: [Activity],
        activitiesByDuty(dutyId: String!): [Activity]
        activitiesByUser(userId: String!): [Activity]
    }

    type Mutation {
        addCommInstructionActivity(
            userId: String!,
            dutyId: String!,
            approvalStatus: Boolean!,
            description: String!,
            evidenceId: String
        ): CommInstructionActivity
        editCommInstructionActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            description: String,
            evidenceId: String 
        ): CommInstructionActivity
        deleteCommInstructionActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            description: String,
            evidenceId: String
        ): CommInstructionActivity

        addPublicServiceActivity(
            userId: String!,
            dutyId: String!,
            approvalStatus: Boolean!,
            description: String!,
            evidenceId: String
        ): PublicServiceActivity
        editPublicServiceActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            description: String,
            evidenceId: String 
        ): PublicServiceActivity
        deletePublicServiceActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            description: String,
            evidenceId: String
        ): PublicServiceActivity

        addLectureActivity(
            userId: String!,
            dutyId: String!,
            lectureStackId: String!
        ): LectureActivity
        editLectureActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            lectureStackId: String
        ): LectureActivity
        deleteLectureActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            lectureStackId: String
        ): LectureActivity

        addResearchActivity(
            userId: String!,
            dutyId: String!,
            approvalStatus: Boolean!,
            researchType: String!,
            researchUrl: String!
        ): ResearchActivity
        editResearchActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            researchType: String!,
            researchUrl: String!
        ): ResearchActivity
        deleteResearchActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            researchType: String,
            researchUrl: String
        ): ResearchActivity

        addSupervisionActivity(
            userId: String!,
            dutyId: String!,
            approvalStatus: Boolean,
            supervisionRole: String!,
            studentId: String!
        ): SupervisionActivity
        editSupervisionActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            supervisionRole: String,
            studentId: String
        ): SupervisionActivity
        deleteSupervisionActivity(
            activityId: String,
            userId: String,
            dutyId: String,
            approvalStatus: Boolean,
            supervisionRole: String,
            studentId: String
        ): SupervisionActivity
    }
`;