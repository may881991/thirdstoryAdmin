import React, { Component }from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from "../LogIn/Login";
import SignUp from "../SignUp/SignUp";
import Dashboard from '../Dashboard/Dashboard';

function getToken(){
  const tokenString = sessionStorage.getItem('token');
  console.log(tokenString)
  return tokenString;
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = { apiResponse : "" };
  }

  callAPI(){
    fetch("http://localhost:8080/login")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}))
      .catch(err => err)
  }

  componentDidMount(){
    this.callAPI();
  }

  render(){
    const token = getToken();
    console.log(token)
    if(!token) {
      console.log("not token")
      return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />}> </Route>
            <Route path="/SignUp" element={<SignUp />}> </Route>
            <Route path="/Dashboard" element={<Dashboard />}> </Route>
          </Routes>
        </BrowserRouter>
      );
    }else{
      return(
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}> </Route>
            <Route path="/SignUp" element={<SignUp />}> </Route>
            <Route path="/Dashboard" element={<Dashboard />}> </Route>
          </Routes>
        </BrowserRouter>
      );
    }

  }
}

export default App;
