import React, {useState, useContext} from 'react';
import {credsContext} from '../context/credsContext';
import {ReactComponent as Google} from '../layout/google.svg';
import {ReactComponent as GitHub} from '../layout/github.svg';
import {ReactComponent as Confirm} from '../layout/confirm.svg';
import axios from 'axios';

export const Login = ({onClose, closeHandler}) => {

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.id]: event.target.value})
      }

    const context = useContext(credsContext);

    const LoginHandler = async () => {
       const response = await axios.post('/auth/login', {
            username: form.username,
            password: form.password
        });
        
        if(response.data.token){
            context.login(response.data.token, response.data.username, response.data.roles);
            closeHandler.setRegister(false);
            closeHandler.setSignIn(false);
        }

        
    }

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="register">
                <p className="header">SIGN IN</p>
                <input type="username" id="username" className="input-group" placeholder="Username" onChange={changeHandler}/>
                <input type="password" id="password" className="input-group" placeholder="Password" onChange={changeHandler}/>
                <div className="icons-wrapper">
                    <Google className="icons" />
                    <GitHub className="icons" />
                </div>
                <div className="confirm-wrapper">
                    <Confirm className='confirm' onClick={LoginHandler}/> 
                </div>        
            </div>
        </div>
    )
}