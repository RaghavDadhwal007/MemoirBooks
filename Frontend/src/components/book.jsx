import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as apiServices from "../services/apiServices";
import LoginContext from './favorites-context';

export default function BookHandler() {
  const [bookList, setBookList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    listHandler();
    setRememeberState();
  }, []);

  const listHandler = () => {
    apiServices.bookList().then((resp) => {
      setBookList(resp ? resp.data.data.book : "");
    });
  };

  const setRememeberState = () => {
    setIsLogged(localStorage.getItem("token") ? true : false)
  };

  return (
    <div className="content-page-admin">
      <div className="content">
        <div className="container-fluid">
          {bookList.map((book)=>(

            <ul className="list-group" key={book._id} >
              {loginCtx.isLoggedIn ? 
            <Link to={{pathname:`/book-detail/${book._id}`, state:book}}>

              <li className="list-group-item d-flex justify-content-between align-items-center" style={{color: '#000'}}>
                {book?.title ? book.title : 'undefined'}
              <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
               
              </li>
            </Link>
              :
              <li className="list-group-item d-flex justify-content-between align-items-center" style={{color: '#000'}}>
                {book?.title ? book.title : 'undefined'}
               
              </li>
              }
            </ul>

          ))}
        </div>
      </div>
    </div>
  );
}
