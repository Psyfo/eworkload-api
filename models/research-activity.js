const mongoose = require('mongoose');
const Activity = require('./activity');

const researchActivitySchema = new mongoose.Schema({
    researchType: {
        type: String,
        required: true,
        trim: true
    },
    researchUrl: {
        type: String,
        required: true,
        trim: true
    }
});

const ResearchActivity = Activity.discriminator('ResearchActivity', researchActivitySchema);
module.exports = ResearchActivity;