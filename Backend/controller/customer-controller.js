const Customer = require('../models/customer.js');

const createCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    const customer = new Customer({
        name,
        email,
        phone,
        address
    });

    const savedCustomer = await customer.save();

    res.status(201).json({
        message: "Customer Inserted",
        customer: savedCustomer
    });
};


const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        res.status(200).json({
            customers: customers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            customer: customer
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer updated",
            customer: customer
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer deleted",
            customer: customer
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};