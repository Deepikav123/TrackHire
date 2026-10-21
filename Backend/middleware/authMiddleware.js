const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json(
            {
                message: "Unauthorized Access"
            }
        )
    }
    const parts = authorizationHeader.split(" ");
    const token = parts[1];
    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }
    try{

        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoder;
    }
    catch(err){

        return res.status(401).json(
            {
                message: "Unauthorized Access"
            }
        )
    }
 
    next();
}
module.exports = authMiddleware;