"use strict";

const BOOK = require("../model/bookModel"); // import user model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // bcrypt for encryption of password
const responseMessage = require("../../../helpers/responseMessages"); // for static response message
const { setResponseObject } = require("../../../helpers/commonFunctions"); // for common functions used on some files

const _book = {};

_book.addBook = async (req, res, next) => {
  try {
    let data = req.body;
    let book = await new BOOK(data).save();
    if (book) {
      await setResponseObject(
        req,
        true,
        responseMessage.ADD_SUCCESS("Book"),
        book
      );
      next();
    }
  } catch (err) {
    await setResponseObject(req, false, err, "");
    next();
  }
};

_book.bookList = async (req, res, next) => {
  try {
    let book = await BOOK.find().sort({createdAt:-1});
    await setResponseObject(
      req,
      true,
      responseMessage.RECORD_FOUND("Books"),
      { book }
    );
    next();
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_book.bookDetails = async (req, res, next) => {
  try {
    let book = await BOOK.findById(req.params.id);
    await setResponseObject(
      req,
      true,
      responseMessage.RECORD_FOUND("Book"),
      { book }
    );
    next();
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_book.updateBook = async (req, res, next) => {
  try {
    let data = req.body
    let book = await BOOK.findByIdAndUpdate(req.params.id,data,{new:true});
    await setResponseObject(
      req,
      true,
      responseMessage.UPDATE_SUCCESS("Book"),
      { book }
    );
    next();
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

_book.deleteBook = async (req, res, next) => {
  try {
    let book = await BOOK.findByIdAndDelete(req.params.id);
    await setResponseObject(
      req,
      true,
      responseMessage.DELETE("Book"),
      { book }
    );
    next();
  } catch (err) {
    await setResponseObject(
      req,
      false,
      err.message ? err.message : responseMessage.SOMETHING_WRONG,
      ""
    );
    next();
  }
};

module.exports = _book;
