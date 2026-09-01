const Vehicle = require("../models/vehicle.js");

const createVehicle = async (req, res) => {
    try {
        const {
            customerId,
            vehicleNumber,
            vehicleType,
            model,
            year
        } = req.body;

        const vehicle = new Vehicle({
            customerId,
            vehicleNumber,
            vehicleType,
            model,
            year
        });

        const savedVehicle = await vehicle.save();

        res.status(201).json({
            message: "Vehicle Inserted",
            vehicle: savedVehicle
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();

        res.status(200).json({
            vehicles: vehicles
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            vehicle: vehicle
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle updated",
            vehicle: vehicle
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.status(200).json({
            message: "Vehicle deleted",
            vehicle: vehicle
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};