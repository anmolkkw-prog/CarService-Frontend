const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        serviceType: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const ServiceRequest = mongoose.model(
    "ServiceRequest",
    serviceRequestSchema
);

module.exports = ServiceRequest;