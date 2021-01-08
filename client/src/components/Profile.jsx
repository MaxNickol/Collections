import React from 'react'
import {CollectionsTable} from './CollectionsTable';
import {ReactComponent as PlusSVG} from '../layout/plus.svg';
import {NavLink} from 'react-router-dom';

export const Profile = ({onClose, profile, clickCatcher, collectionsTable }) => {

    
    
    const collectionsCatcher = (e) => {
        console.log(e.target.id)
    }

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="profile" onClick={(e) => clickCatcher(e)}>
                <div className="info-wrapper text-break">
                    <p>ID: {profile._id}</p>
                    <p>Login: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.roles[0]}</p>
                </div>
                <div className="create-wrapper mt-3">
                    <button className="create-btn" id="Collections">Collections</button>
                    <NavLink to="/createCollection" id="Create"><PlusSVG className="svg svg-green" id="Create"/></NavLink>
                </div>
                {collectionsTable ? <CollectionsTable username={profile.username} catcher={collectionsCatcher}/> : null}
            </div>
        </div>
    )
}