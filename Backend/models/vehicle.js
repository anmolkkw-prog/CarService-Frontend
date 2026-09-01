const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        vehicleNumber: {
            type: String,
            required: true,
            unique: true
        },

        vehicleType: {
            type: String,
            required: true
        },

        model: {
            type: String,
            required: true
        },

        year: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;