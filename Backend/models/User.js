const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            type: String,
            trim: true,

            required: true
        }
    },
    {
        timestamps: true
    }

)

const userModel = mongoose.model("Users", userSchema);
module.exports=userModel;