"use strict";
const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;

const BOOKS = new SCHEMA(
  {
    title: {
      type: String,
    },
    pages: {
      type: Number,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false, collection: "bboks" }
);

module.exports = mongoose.model("Books", BOOKS);
