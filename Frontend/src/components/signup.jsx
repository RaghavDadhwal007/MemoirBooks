import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import * as apiServices from "../services/apiServices";
import "./bookForm.css";

export default function SignUp() {
  const [userDetail, setUserDetail] = useState();
  const [errors, setError] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [redirectToNewPage, setredirectToNewPage] = useState(false);  

  const onNameChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.username =
          value.length < 3
            ? "Username must be at least 3 characters long!"
            : "";
        break;

      case "email":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.email =
          value.length < 1
            ? "Please write something about the book!"
            : "";
        break;

      case "password":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.password =
        isNaN(Number(value))
            ? "Password must be in Number!"
            : "";
        break;

      default:
        break;
    }
    setError(errors);
  };

  const formHandler = (e) => {
    e.preventDefault();
    errors.title = userDetail?.title.length ? "" : "This Field is Required"
    errors.description = userDetail?.description.length ? "" : "This Field is Required"
    errors.pages = userDetail?.pages.length ? "" : "This Field is Required"
    errors.author = userDetail?.author.length ? "" : "This Field is Required"
    let err = errors.title|| errors.description || errors.pages|| errors.author ? true : false
    if(!err){
      const data = {
        title: userDetail?.title,
        description: userDetail?.description,
        pages: userDetail?.pages,
        author: userDetail?.author,
      };
      apiServices.addBook(data).then((resp) => {
        try {  
          if (resp.data.success) {
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

//   if (redirectToNewPage) {
//     return (
//     <Redirect to={{pathname:`/book-detail/${bookDetail._id}`, state:bookDetail}}/>
    
//     )
//   }
  return (
    <form className="form" onSubmit={formHandler}>
      <div className="control">
        <label htmlFor="title">Username</label>
        <input
          type="text"
          name="username"
          // required
          id="username"
          onChange={onNameChange}
          value={userDetail?.username ? userDetail?.username : ""}
        />
        <span style={{color:"red"}}>{errors.username}</span>
      </div>
      <div className="control">
        <label htmlFor="title">Email</label>
        <input
          type="text"
          name="email"
          // required
          id="email"
          onChange={onNameChange}
          value={userDetail?.email ? userDetail?.email : ""}
        />
        <span style={{color:"red"}}>{errors.email}</span>
      </div>
      <div className="control">
        <label htmlFor="title">Password</label>
        <input
          type="text"
          name="password"
          // required
          id="password"
          onChange={onNameChange}
          value={userDetail?.password ? userDetail?.password : ""}
        />
        <span style={{color:"red"}}>{errors.password}</span>
      </div>
      <div className="actions">
        <button>SignUp</button>
      </div>
    </form>
  );
}
