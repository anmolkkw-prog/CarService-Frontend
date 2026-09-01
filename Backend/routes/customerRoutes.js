const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");

const router = express.Router();

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require("../controller/customer-controller");

// Create customer
router.post("/", createCustomer);

// Protected routes
router.get("/", authMiddleware, getCustomers);

router.get("/:id", authMiddleware, getCustomerById);

router.put("/:id", authMiddleware, updateCustomer);

// Admin only
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    deleteCustomer
);

module.exports = router;