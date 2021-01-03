import React, {useContext} from 'react';
import {credsContext} from '../context/credsContext';
import {ReactComponent as UserSVG} from '../layout/User.svg';
import {ReactComponent as SettingsSVG} from '../layout/settings.svg';
import {ReactComponent as SearchSVG} from '../layout/search.svg';
import {ReactComponent as PlusSVG} from '../layout/plus.svg';
import {ReactComponent as PowerButton} from '../layout/power-button.svg';
import {ReactComponent as SignIn} from '../layout/login.svg';
import { NavLink } from 'react-router-dom';

export const NavBar = ({onClick, onExit}) => { 


    const creds = useContext(credsContext);

    return(
        <div className="NavBar">

            {creds.isAuth ? (
                <>
                <UserSVG />
                <SearchSVG />
                <PlusSVG />
                <SettingsSVG />
    
                <div className="button-wrapper">
                    <PowerButton onClick={() => onExit()}/>
                </div>
                </>
            ) : (
                <>
                <NavLink to="/registration" activeClassName="active"><SignIn onClick={() => onClick()} /></NavLink>
                <SearchSVG />
                </>
            )}

            
            
        </div>
    )
}