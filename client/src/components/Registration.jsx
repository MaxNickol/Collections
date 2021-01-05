import React, {useState, useContext} from 'react';
import {credsContext} from '../context/credsContext';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Google} from '../layout/google.svg';
import {ReactComponent as GitHub} from '../layout/github.svg';
import {ReactComponent as Confirm} from '../layout/confirm.svg';
import axios from 'axios';

export const Registration = ({onClick, onClose, closeHandler}) => {

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmedPassword: ''
      });

    const changeHandler = (event) => {
        setForm({...form, [event.target.id]: event.target.value})
      }

    const creds = useContext(credsContext);

    const registerHandler = async () => {
        const response = await axios.post('/auth/registration', {
            email: form.email,
            username: form.username,
            password: form.password
        })

        if(response.data.token) {
            creds.login(response.data.token, response.data.username, response.data.roles);
            closeHandler.setRegister(false);
        }
        

    }

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="register">
                <p className="header">JOIN US</p>
                <input type="email" id="email" className="input-group" placeholder="Email" onChange={changeHandler}/>
                <input type="username" id="username" className="input-group" placeholder="Username" onChange={changeHandler}/>
                <input type="password" id="password" className="input-group" placeholder="Password" onChange={changeHandler}/>
                <input type="password" id="confirmedPassword" className="input-group" placeholder="Confirm password" onChange={changeHandler}/>
                <div className="icons-wrapper">
                    <Google className="icons" />
                    <GitHub className="icons" />
                </div>
                <div className="confirm-wrapper">
                    <Confirm className='confirm' onClick={registerHandler}/> 
                    <NavLink to='/signin' onClick={onClick}>Sign in</NavLink>
                </div>        
            </div>
        </div>
    )
}