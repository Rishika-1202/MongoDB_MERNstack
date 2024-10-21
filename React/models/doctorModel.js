const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {  // Fixed the casing to be consistent
            type: String,
            required: true,
        },
        lastName: {  // Fixed the casing to be consistent
            type: String,
            required: true,
        },
        phoneNumber: {  // Fixed the casing to be consistent
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        feePerConsultation: {
            type: Number,
            required: true,
        },
        timings: {
            type: [String],  // Defined as an array of strings for better clarity
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);  // Model name capitalized for clarity
module.exports = doctorModel;
