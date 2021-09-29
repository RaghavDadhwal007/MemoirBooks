import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import * as apiServices from "../services/apiServices";
import LoginContext from './favorites-context';
import "./bookForm.css";

export default function Login() {
  const [userDetail, setUserDetail] = useState();
  const [errors, setError] = useState({
    username: "",
    password: ""
  });
  const [redirectToNewPage, setredirectToNewPage] = useState(false);  
  const loginCtx = useContext(LoginContext);

  const onNameChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.username =
          value.length
            ? ""
            : "Please Enter the Username/Email!";
        break;

      case "password":
        setUserDetail((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        errors.password =
        value.length
            ? ""
            : "Please enter the Password!";
        break;

      default:
        break;
    }
    setError(errors);
  };

  const formHandler = (e) => {
    e.preventDefault();
    errors.username = userDetail?.username.length ? "" : "This Field is Required"
    errors.password = userDetail?.password.length ? "" : "This Field is Required"
    let err = errors.username|| errors.password ? true : false
    if(!err){
      const data = {
        username: userDetail?.username,
        password: userDetail?.password
      };
      apiServices.login(data).then((resp) => {
        try {  
          if (resp.data.success) {
            loginCtx.Login(resp?.data?.token)
              // localStorage.setItem('token', resp?.data?.token);         
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

  if (redirectToNewPage) {
    return (
    <Redirect to='/'/>
    )
  }
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
        <label htmlFor="title">Password</label>
        <input
          type="password"
          name="password"
          // required
          id="password"
          onChange={onNameChange}
          value={userDetail?.password ? userDetail?.password : ""}
        />
        <span style={{color:"red"}}>{errors.password}</span>
      </div>
      <div className="actions">
        <button>Login</button>
      </div>
    </form>
  );
}
