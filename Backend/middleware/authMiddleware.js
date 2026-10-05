const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json(
            {
                "Message": "Unauthorized Access"
            }
        )
    }
    const parts = authorizationHeader.split(" ");
    const token = parts[1];
    try{

        const decoder = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoder;
    }
    catch(err){

        return res.status(401).json(
            {
                "Message": "Unauthorized Access"
            }
        )
    }
 
    next();
}
module.exports = authMiddleware;