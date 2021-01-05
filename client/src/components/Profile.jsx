import React from 'react'


export const Profile = ({onClose, profile}) => {

    return(
        <div className="overlay" onClick={(e) => onClose(e)}>
            <div className="profile">
                <div className="info-wrapper text-break">
                    <p>ID: {profile._id}</p>
                    <p>Login: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.roles[0]}</p>
                </div>

                <button className="create-btn mt-3">Collections</button>

            </div>
        </div>
    )
}