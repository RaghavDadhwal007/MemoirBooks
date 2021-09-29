"use strict";

const USER = require("../model/userModel"); // import user model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const setResponseObject =
  require("../../../helpers/commonFunctions").setResponseObject; // for common functions used on some files

const _user = {};

_user.signup = async (req, res, next) => {
  try {
    let data = req.body;
    if (data.password) {
      let hash = await bcrypt.hash(
        data.password,
        parseInt(process.env.SALT_ROUNDS)
      );
      data.password = hash;
    }
    let saveUser = await new USER(data).save();
    let token_Data = {
      email: saveUser.email,
      _id: saveUser._id,
      userName: saveUser.userName,
    };
    let token = jwt.sign(token_Data, process.env.JWT_SECRET || "development");
    if (saveUser) {
      await setResponseObject(
        req,
        true,
        responseMessage.VERIFICATION("signup"),
        { token, saveUser }
      );
      next();
    }
  } catch (err) {
    console.log(`err`, err)
    await setResponseObject(req, false, err, "");
    next();
  }
};

_user.login = async (req, res, next) => {
  try {
    let saveUser = await USER.findOne({
      $or: [{ userName: req.body.username }, { email: req.body.username }],
    });
    if (!saveUser) {
      res.status(400).send({
        success: false,
        message: responseMessage.INVALID("Username or Email"),
      });
    } 
    
      let data = req.body;
      let pwPresent = await bcrypt.compare(data.password, saveUser.password);
      if (!pwPresent) {
        throw { message: responseMessage.INCORRECTPASSWORD };
      } else {
        let token_Data = {
          email: saveUser.email,
          _id: saveUser._id,
          userName: saveUser.userName,
        };
        let token = jwt.sign(token_Data, process.env.JWT_SECRET || "development");
        res.send({
          success: true,
          message: responseMessage.SUCCESS("login"),
          data: saveUser,
          token,
        });
      }
  } catch (err) {
    // throw exception message
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

module.exports = _user;
