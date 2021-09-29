"use strict";
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
const VALIDATOR = require("validator"); // for check email validators

const USERS = new SCHEMA(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: (value) => {
        return VALIDATOR.isEmail(value);
      },
    },
    userName: { type: String, unique: true, required: true },
    profileImg: {
      type: String,
    },
    password: { required: true, type: String },
  },
  { timestamps: true, versionKey: false, collection: "user" }
);

module.exports = mongoose.model("User", USERS);
