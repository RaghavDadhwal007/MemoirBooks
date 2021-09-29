import { createContext, useState } from 'react';

const LoginContext = createContext({
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {},
});

export function LoginContextProvider(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  function Login(token) {
    localStorage.setItem('token', token);         
    setUserLoggedIn(true);
  }

  function Logout() {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
  }

  const context = {
    isLoggedIn: userLoggedIn,
    Login: Login,
    Logout: Logout,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
