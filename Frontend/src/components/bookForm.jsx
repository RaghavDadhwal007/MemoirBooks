import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import * as apiServices from "../services/apiServices";
import "./bookForm.css";

export default function BookForm() {
  const [bookDetail, setBookDetail] = useState();

  const [errors, setError] = useState({
    title: "",
    description: "",
    author: "",
    pages: "",
  });
  const [redirectToNewPage, setredirectToNewPage] = useState(false);
  const flag = window.location.href.includes("update") ? true : false

  useEffect(()=>{
    if(flag){
      bookData(window.location.href.split("/").pop())
    }
  }, [flag])
  

  const onNameChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setBookDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.title =
          value.length < 3
            ? "Title must be at least 3 characters long!"
            : "";
        break;

      case "description":
        setBookDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.description =
          value.length < 1
            ? "Please write something about the book!"
            : "";
        break;

      case "pages":
        setBookDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.pages =
        isNaN(Number(value))
            ? "Pages must be in Number!"
            : "";
        break;

      case "author":
        setBookDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.author =
          value.length < 1
            ? "Please enter the author name!"
            : "";
        break;

      default:
        break;
    }
    setError(errors);
  };

  const formHandler = (e) => {
    e.preventDefault();
    errors.title = bookDetail?.title.length ? "" : "This Field is Required"
    errors.description = bookDetail?.description.length ? "" : "This Field is Required"
    errors.pages = bookDetail?.pages.length ? "" : "This Field is Required"
    errors.author = bookDetail?.author.length ? "" : "This Field is Required"
    let err = errors.title|| errors.description || errors.pages|| errors.author ? true : false
    if(!err){
      const data = {
        title: bookDetail?.title,
        description: bookDetail?.description,
        pages: bookDetail?.pages,
        author: bookDetail?.author,
      };
      apiServices.addBook(data).then((resp) => {
        try {  
          if (resp.data.success) {
            bookDetail._id = resp.data?.data?._id
            setredirectToNewPage(true)
          }
          else{
            alert(resp.data?.message)
          }
        } catch (err) {
          console.log("here in api error", err);
        }
      });
    }
    else{
      alert("Please fill the form properly!")
    }
  };

  const bookData = (id) => {
    apiServices.bookDetail(id).then((resp) => {
      setBookDetail(resp?.data?.data?.book)
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    console.log(`In Update`, bookDetail?._id)
    const data = {
      title: bookDetail?.title,
      description: bookDetail?.description,
      pages: bookDetail?.pages,
      author: bookDetail?.author,
    };
    apiServices.updateBook(bookDetail?._id, data).then((resp) => {
      try {
    console.log(resp,";;;;;;;")
    if (resp?.data?.success) {
      setredirectToNewPage(true)
  
          // document.getElementById("close").click();
          // showNotification("success", resp.data.message);
        } else {
          // showNotification("danger", resp.data.message);
        }
      } catch (err) {}
    });
  };

  if (redirectToNewPage) {
    return (
    <Redirect to={{pathname:`/book-detail/${bookDetail._id}`, state:bookDetail}}/>
    
    )
  }
  return (
    <form className="form" onSubmit={flag ? onUpdate: formHandler}>
      <div className="control">
        <label htmlFor="title">Book Title</label>
        <input
          type="text"
          name="title"
          // required
          id="title"
          onChange={onNameChange}
          value={bookDetail?.title ? bookDetail?.title : ""}
        />
        <span style={{color:"red"}}>{errors.title}</span>
      </div>
      <div className="control">
        <label htmlFor="author">Book Author</label>
        <input
          type="text"
          name="author"
          // required
          id="author"
          value={bookDetail?.author ? bookDetail?.author : ""}
          onChange={onNameChange}
        />
        <span style={{color:"red"}}>{errors.author}</span>
      </div>
      <div className="control">
        <label htmlFor="pages">Pages</label>
        <input
          type="text"
          name="pages"
          // required
          id="pages"
          value={bookDetail?.pages ? bookDetail?.pages : ""}
          onChange={onNameChange}
        />
        <span style={{color:"red"}}>{errors.pages}</span>
      </div>
      <div className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          // required
          rows="5"
          name="description"
          value={bookDetail?.description ? bookDetail?.description : ""}
          onChange={onNameChange}
        ></textarea>
        <span style={{color:"red"}}>{errors.description}</span>
      </div>
      <div className="actions">
        <button>{flag ? "Update Book": "Add Book"}</button>
      </div>
    </form>
  );
}
