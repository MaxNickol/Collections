import React, {useState, useEffect} from 'react';
import {credsContext} from './context/credsContext';
import { NavBar } from './components/NavBar';
import {Registration} from './components/Registration';
import {Login} from './components/Login';
import {Profile} from './components/Profile';
import {CreateCollection} from './components/CreateCollection';
import {useCreds} from './hooks/useCreds';
import {useStorage} from './hooks/useStorage';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css';



function App() {

  const [register, setRegister] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [profile, setProfile] = useState(false);
  const [createForm, setCreateForm] = useState(false);

  const [profileView, setProfileView] = useState(null);

  const {login, logout, creds} = useCreds();
  const user = useStorage();

  const isAuth = !!creds.token;
  
  const clickCatcher = (event) => {
    
    const target = event.target.id;

    switch (target) {
      case "Login":
        setRegister(true);
        setSignIn(false);
        break;
      case "Logout":
        setProfile(false);
        logout();
        break;
      case "Profile":
        setProfile(!profile);
        break;
      default:
        break;
    }
  }

  const closeModal = (event) => {
    if(event.target.className === "overlay") {
      setRegister(!register);
      setSignIn(false);
      setProfile(false);
      setCreateForm(false);
    }
  }

  const signInHandler = () => {
    setSignIn(!signIn);
  }

  const profileClickCatcher = (e) => {

    const target = e.target.id;

    switch (target) {
      case "Create":
        setCreateForm(true);
        break;
      default:
        break;
    }

  }

  useEffect(() => {

    const fetchProfile = async () => {

      
      if(user) {
        const response = await axios.post('/api/profile', {
          user: user.username
        })

        setProfileView(response.data.user[0]);
      }
      
    }

    fetchProfile();

  }, [creds.token, user]);

  return (
    <div className="App">
      <credsContext.Provider value={{login, logout, creds, isAuth}}>
      <Router>

        
        <NavBar clickCatcher={clickCatcher}/>

        <Switch>
          <Route path='/registration' >
            {register ? <Registration onClick={signInHandler} onClose={closeModal} closeHandler={{setRegister, setSignIn}}/> : <Redirect to='/' />}
          </Route>
          <Route path='/signin' >
            {signIn ? <Login  onClose={closeModal} closeHandler={{setRegister, setSignIn}}/> : <Redirect to='/'/>}
          </Route>
          <Route path='/profile'>
            {profile ? <Profile onClose={closeModal} profile={profileView} clickCatcher={profileClickCatcher}/> : <Redirect to='/'/>}
          </Route>
          <Route path='/createCollection'>
            {createForm ? <CreateCollection onClose={closeModal} /> : null}
          </Route>
        </Switch>


      </Router>
      </credsContext.Provider>
    </div>
  );
}

export default App;
