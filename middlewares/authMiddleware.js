import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import Problem from "../middlewares/problem.js";

const isValidUser = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(
      new Problem("You are not authorized/invalid authorization", 401)
    );
  }
  try {
    // Get Token from header
    token = authorization.split(" ")[1];
    if (!token) {
      return next(new Problem("Unauthorized User, No Token", 401));
    }

    // Verify Token
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get User from Token
    req.user = await UserModel.findById(userID).select("-password");

    next();
  } catch (error) {
    console.log(error);
    next(error);
    //res.status(401).send({ status: "failed", message: "Unauthorized User" });
  }
};

export default isValidUser;
