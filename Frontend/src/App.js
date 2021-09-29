import { Switch, Route } from "react-router-dom";
import BookHandler from "./components/book";
import BookDetails from "./components/bookDetails";
import BookForm from "./components/bookForm";
import Layout from './components/Layout';
// import SignUp from './components/signup';
import Login from './components/login';


function App() {
  return (
    <Layout>
    <Switch>
      <Route exact path="/" component={BookHandler} />
      <Route path="/book-detail/:id" component={BookDetails} />
      <Route path="/addBook" component={BookForm} />
      <Route path="/updateBook/:id" component={BookForm} />
      {/* <Route path="/signUp" component={SignUp} /> */}
      <Route path="/logIn" component={Login} />
    </Switch>
    </Layout>
  );
}

export default App;
