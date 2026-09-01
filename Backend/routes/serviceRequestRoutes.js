const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

const {
    createServiceRequest,
    getServiceRequests,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest
} = require("../controller/service-request-controller");


router.post("/", createServiceRequest);

router.get("/", getServiceRequests);

router.get("/:id", getServiceRequestById);

router.put("/:id", updateServiceRequest);

router.delete("/:id", deleteServiceRequest);

module.exports = router;