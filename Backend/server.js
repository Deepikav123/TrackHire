const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const authMiddleware=require("./middleware/authMiddleware")
env.config({ path: require("path").join(__dirname, ".env") });
mongoose.connect(process.env.MONGO_URI);
const app = express();

const applicationRouter=require("./routes/applicationRoutes");
const emailRouter=require("./routes/emailRoutes");
const authRouter=require("./routes/authRoutes");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("TrackHire backend is running");
});

app.use("/api/applications",authMiddleware,applicationRouter);
app.use("/api/email",emailRouter);
app.use("/api/auth",authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});