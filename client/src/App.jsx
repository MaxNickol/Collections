import React, {useState, useEffect} from 'react';
import {credsContext} from './context/credsContext';
import { NavBar } from './components/NavBar';
import {Registration} from './components/Registration';
import {Login} from './components/Login';
import {Profile} from './components/Profile';
import {CreateCollection} from './components/CreateCollection';
import {EditForm} from './components/EditForm';
import {useCreds} from './hooks/useCreds';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css';



function App() {

  const [register, setRegister] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [profile, setProfile] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [collectionsTable, setCollectionsTable] = useState(true);
  const [editForm, setEditForm] = useState(false);


  const [profileView, setProfileView] = useState(null);

  const {login, logout, creds} = useCreds();
  
  const isAuth = !!creds.token;
  
  const navbarCatcher = (event) => {
    
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
      setEditForm(false);
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
        case "Collections":
          setCollectionsTable(!collectionsTable);
          break;
      default:
        break;
    }

  }

  const [render, setRender] = useState(false);

  const [editCollection, setEditCollection] = useState([]);

  const actionHandler = async (event, id) => {

    const target = event.target.id;

    if(target === "Delete") {
            const response = await axios.post('/api/deleteCollection', {id: id});
            setRender(!render);
            console.log(response.data.message);
            }
    else if(target === "Edit") {
            setEditForm(true)
            const response = await axios.post('/api/getParticularCollection', {id})
                
            if(response.data.collection) {
              setEditCollection(response.data.collection)
            }
            }
    }




  useEffect(() => {

    const fetchProfile = async () => {

      const user = JSON.parse(localStorage.getItem('CredsInfo'));
      
      if(user) {
        const response = await axios.post('/api/profile', {
          user: user.username
        })

        setProfileView(response.data.user[0]);
      }
      
    }

    fetchProfile();
    
  
  }, [creds.token]);

  return (
    <div className="App">
      <credsContext.Provider value={{login, logout, creds, isAuth}}>
      <Router>

        
        <NavBar clickCatcher={navbarCatcher}/>

        <Switch>
          <Route path='/registration' >
            {register ? <Registration onClick={signInHandler} onClose={closeModal} closeHandler={{setRegister, setSignIn}}/> : <Redirect to='/' />}
          </Route>
          <Route path='/signin' >
            {signIn ? <Login  onClose={closeModal} closeHandler={{setRegister, setSignIn}}/> : <Redirect to='/'/>}
          </Route>
          <Route path='/profile'>
            {profile ? <Profile onClose={closeModal} profile={profileView} clickCatcher={profileClickCatcher} collectionsTable={collectionsTable} actionHandler={actionHandler} render={render}/> : <Redirect to='/'/>}
          </Route>
          <Route path='/createCollection'>
            {createForm ? <CreateCollection onClose={closeModal} username={profileView.username}/> : null}
          </Route>
          <Route path='/EditCollection'>
            {editForm ? <EditForm onClose={closeModal} collection={editCollection}/>: null}
          </Route>
        </Switch>

      </Router>
      </credsContext.Provider>
    </div>
  );
}

export default App;
