const express = require("express");
require("dotenv").config();

const app = express();

const connectDB = require("./config/database");
connectDB();

app.use(express.json());

const customerRoutes = require("./routes/customerRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");


app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "car service is coming soon"
    });
});

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});