import React from 'react'
import {ReactComponent as PlusSVG} from '../layout/plus.svg';
import {NavLink} from 'react-router-dom';

export const Profile = ({onClose, profile, clickCatcher }) => {

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="profile">
                <div className="info-wrapper text-break">
                    <p>ID: {profile._id}</p>
                    <p>Login: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.roles[0]}</p>
                </div>
                <div className="create-wrapper mt-3">
                    <button className="create-btn">Collections</button>
                    <NavLink to="/createCollection" id="Create" onClick={(e) => clickCatcher(e)}><PlusSVG className="svg" id="Create"/></NavLink>
                </div>
            </div>
        </div>
    )
}