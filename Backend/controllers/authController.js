const userModel=require("../models/User");
async function register(req,res){
 try {
        const data = req.body;
        const isExist = await userModel.findOne({
            email: data.email
        })
        if (isExist) {
            return res.status(409).json({ "Message": "User already exist" })
        }
        const hashedValue = await bcrypt.hash(data.password, 10);
        const user = {
            email: data.email,
            password: hashedValue
        }
        await userModel.create(user);
        res.status(201).json({
            "Message": "Successfully created"
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

async function login(req,res){
     try {

        const data = req.body;
        const user = await userModel.findOne({
            email: data.email
        })
        if (!user) {
            return res.status(404).json({
                "Message": "User not found"
            })
        }
        const comparePassword = await bcrypt.compare(data.password, user.password);
        if (comparePassword) {
            const token = jwt.sign({
                "userId": user._id
            }, process.env.JWT_SECRET)
            res.status(200).json({
                "Message": "Successful Login",
                "token": token
            })
        }
        else {
            return res.status(400).json({
                "Message": "Invalid email or password"
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

module.exports= {register,login}