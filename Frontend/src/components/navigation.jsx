import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import LoginContext from './favorites-context';

import './MainNavigation.css';

function MainNavigation() {
  const [isLogged, setIsLogged] = useState(false);
  // export const ThemeContext = React.createContext({isLogged, setIsLogged});
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    setRememeberState();
  });

  const setRememeberState = () => {
    setIsLogged(localStorage.getItem("token") ? true : false)
  };

  function logout() {
    loginCtx.Logout()
    // localStorage.removeItem("token");
    // setRememeberState()
  }
  return (
    
    <header className='header'>
      <div className='logo'>React Books</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>All Books</Link>
          </li>
          <li>
            <Link to='/addBook'>Add New Book</Link>
          </li>
          <li>
            {/* { isLogged ? 
            <Link to='/' onClick={logout}>LogOut</Link>: 
            <Link to='/logIn'>Login</Link>
            } */}
            { loginCtx.isLoggedIn ? 
            <Link to='/' onClick={logout}>LogOut</Link>: 
            <Link to='/logIn'>Login</Link>
            }
            
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
