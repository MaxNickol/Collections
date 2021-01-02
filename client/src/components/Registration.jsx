import React, {useState} from 'react'
import {ReactComponent as Google} from '../layout/google.svg';
import {ReactComponent as GitHub} from '../layout/github.svg';
import {ReactComponent as Confirm} from '../layout/confirm.svg';
import axios from 'axios';

export const Registration = () => {

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmedPassword: ''
      });

    const changeHandler = (event) => {
        setForm({...form, [event.target.id]: event.target.value})
      }

    const registerHandler = async () => {
        const response = await axios.post('/auth/registration', {
            email: form.email,
            username: form.username,
            password: form.password
        })

        console.log(response.data.message);

    }

    return(
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

                <Confirm className='confirm' onClick={registerHandler}/>          
        </div>
    )
}