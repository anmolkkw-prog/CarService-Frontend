const express = require("express");

const router = express.Router();

const {
    getAllUsers
} = require("../controller/admin-controller");

const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/role-middleware");

router.get(
    "/users",
    authMiddleware,
    roleMiddleware(["admin"]),
    getAllUsers
);

module.exports = router;