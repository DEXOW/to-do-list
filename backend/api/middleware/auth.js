import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuthenticatedUser = (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {

        if (err) return res.status(403).send("Token is not valid!");
    
        req.user = await User.findById(payload.id);
        next();
    });
};

export default { isAuthenticatedUser };