import React, {useState} from 'react';
import {credsContext} from './context/credsContext';
import { NavBar } from './components/NavBar';
import {Registration} from './components/Registration';
import {Login} from './components/Login';
import {useCreds} from './hooks/useCreds';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css';



function App() {

  const [clickState, setClick] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const {login, logout, creds} = useCreds();

  const isAuth = !!creds.token;
  

  const closeModal = (event) => {
    if(event.target.className === "overlay") {
      setClick(!clickState);
      setSignIn(false);
    }
  }

  const signInHandler = () => {
    setSignIn(!signIn);
  }

  const registerHandler = (e) => {
    setClick(!clickState);
    setSignIn(false);
  }


  const logoutHandler = () => {
    logout();
  }

  return (
    <div className="App">
      <credsContext.Provider value={{login, logout, creds, isAuth}}>
      <Router>
        <NavBar onClick={() => registerHandler()} onExit={()=> logoutHandler()}/>

        <Switch>
          <Route path='/registration' >
            {clickState ? <Registration onClick={signInHandler} onClose={closeModal}/> : <Redirect to='/' />}
          </Route>
          <Route path='/signin' >
            {signIn ? <Login  onClose={closeModal}/> : <Redirect to='/'/>}
          </Route>
        </Switch>


      </Router>
      </credsContext.Provider>
    </div>
  );
}

export default App;
