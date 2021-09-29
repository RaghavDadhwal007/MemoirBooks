// for authentication check uses json web token
const jwt = require("jsonwebtoken");
const USER  = require("../components/userServices/model/userModel");
const dotenv = require("dotenv");
dotenv.config();
const _tokenManager = {};

_tokenManager.authenticate = async (req, res, next) => {

  if (req.headers['x-token']) {
    let token = getToken(req);
    //verify if authenticated user.
    
    const secret = process.env.JWT_SECRET || "Development";
    jwt.verify(token, secret, async (err, decoded) => {// token verify
      if (decoded) {
        // if token verified then set req keys to middlewares

        req.userId = decoded._id;
        req.userName = decoded.userName;
        let checkToken = await USER.findOne({_id:decoded._id});
        if(!checkToken){
          res.status(401).json({ // return for invalid token
            success: false,
            dateCheck: constant.dateCheck,
            message: "Invalid token",
          });
          return;
        }
        next();
      } else {
        res.status(401).json({ // return for invalid token
          success: false,
          dateCheck: constant.dateCheck,
          message: "Invalid token",
        });
      }
    });
  } else {

    res.status(401).json({ // return for invalid token
      success: false,
      message: "Token is not Provided ",
    });
  }

};

// get token from headers
const getToken = function (req) {
  if (
    req.headers &&
    req.headers['x-token'] &&
    req.headers['x-token'].split(" ")[0] === "Bearer"
  ) {
    return req.headers['x-token'].split(" ")[1];
  }

  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};

module.exports = _tokenManager;
