const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const authMiddleware=require("./middleware/authMiddleware")
env.config();
mongoose.connect('mongodb://127.0.0.1:27017/trackhire');
const app = express();

const applicationRouter=require("./routes/applicationRoutes");
const emailRouter=require("./routes/emailRoutes");
const authRouter=require("./routes/authRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/applications",authMiddleware,applicationRouter);
app.use("/api/email",emailRouter);
app.use("/api/auth",authRouter);

app.listen(3000, () => {
    console.log("Server is running");
})