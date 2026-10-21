const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
async function register(req, res) {
    try {
        const data = req.body;

        const isExist = await userModel.findOne({
            email: data.email
        })

        if (isExist) {
            return res.status(409).json({ message: "User already exist" })
        }

        if (data.password != data.confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match."
            })
        }

        const hashedValue = await bcrypt.hash(data.password, 10);

        const user = {
            username: data.username ? data.username : "User",
            email: data.email,
            password: hashedValue
        }
        await userModel.create(user);
        res.status(201).json({
            message: "Successfully created"
        });

    }
    catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid register data",
                error: err.message
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
}

async function login(req, res) {
    try {

        const data = req.body;
        const user = await userModel.findOne({
            email: data.email
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const comparePassword = await bcrypt.compare(data.password, user.password);
        if (comparePassword) {
            const token = jwt.sign({
                "userId": user._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            }
            )
            res.status(200).json({
                message: "Successful Login",
                "token": token
            })
        }
        else {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
    }
    catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid Login data",
                error: err.message
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }

}

async function getUser(req, res) {
    try {
        const userId = req.user.userId;
        const user = await userModel.findOne(
            {
                _id: userId
            }
        ).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Application not found"
            })
        }
        return res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error"
        });

    }
}

module.exports = { register, login, getUser }