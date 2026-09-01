const ServiceRequest = require("../models/service-request.js");

const createServiceRequest = async (req, res) => {
    try {
        const {
            customerId,
            vehicleId,
            serviceType,
            description
        } = req.body;

        const serviceRequest = new ServiceRequest({
            customerId,
            vehicleId,
            serviceType,
            description
        });

        const savedServiceRequest = await serviceRequest.save();

        res.status(201).json({
            message: "Service Request Created",
            serviceRequest: savedServiceRequest
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find();

        res.status(200).json({
            serviceRequests: serviceRequests
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getServiceRequestById = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(req.params.id);

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service Request not found"
            });
        }

        res.status(200).json({
            serviceRequest: serviceRequest
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service Request not found"
            });
        }

        res.status(200).json({
            message: "Service Request updated",
            serviceRequest: serviceRequest
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndDelete(
            req.params.id
        );

        if (!serviceRequest) {
            return res.status(404).json({
                message: "Service Request not found"
            });
        }

        res.status(200).json({
            message: "Service Request deleted",
            serviceRequest: serviceRequest
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createServiceRequest,
    getServiceRequests,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest
};