import React, {useState} from 'react';
import { NavBar } from './components/NavBar';
import {Registration} from './components/Registration';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css';



function App() {

  const [clickState, setClick] = useState(false);
  

  const clickHandler = (e) => { 
    setClick(!clickState);
  }



  return (
    <div className="App">

        <NavBar onClick={clickHandler}/>

        {clickState ? <Registration /> : null}

    </div>
  );
}

export default App;
