var express = require('express');
var router = express.Router();
const USERS = require("../components/userServices/controller/user.controller");
const BOOKS = require("../components/bookServices/controller/book.controller");
const handleResponse = require("../middlewares/handleResponse");
const auth = require("../middlewares/auth");


router.post("/signup", USERS.signup, handleResponse.RESPONSE);
router.post("/login", USERS.login, handleResponse.RESPONSE);
router.post("/addBook", BOOKS.addBook, handleResponse.RESPONSE);
router.get("/books", BOOKS.bookList, handleResponse.RESPONSE);
router.get("/books/:id", BOOKS.bookDetails, handleResponse.RESPONSE);
router.put("/books/:id", BOOKS.updateBook, handleResponse.RESPONSE);
router.delete("/books/:id", BOOKS.deleteBook, handleResponse.RESPONSE);


// for invalid url
router.use("*", (req, res) => {
  res.send("Looks like you landed at wrong placesss ");
});

module.exports = router;
