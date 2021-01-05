import React, {useContext} from 'react';
import {useStorage} from '../hooks/useStorage';
import {credsContext} from '../context/credsContext';
import {ReactComponent as UserSVG} from '../layout/User.svg';
import {ReactComponent as SettingsSVG} from '../layout/settings.svg';
import {ReactComponent as SearchSVG} from '../layout/search.svg';
import {ReactComponent as PlusSVG} from '../layout/plus.svg';
import {ReactComponent as PowerButton} from '../layout/power-button.svg';
import {ReactComponent as SignIn} from '../layout/login.svg';
import { NavLink } from 'react-router-dom';

export const NavBar = ({clickCatcher}) => { 

    const user = useStorage();
    const creds = useContext(credsContext);

    let settings;

    if(user && user.roles[0] ==="ADMIN") {
        settings = <SettingsSVG id="Settings" />
    }

    return(
        <div className="NavBar" onClick={(e) => clickCatcher(e)}>

            {creds.isAuth ? (
                <>
                <NavLink to="/profile" activeClassName="active"><UserSVG id="Profile"/></NavLink>
                <SearchSVG id="Search"/>
                <PlusSVG />
                {settings}

                <div className="button-wrapper">
                    <PowerButton id="Logout"/>
                </div>
                </>
            ) : (
                <>
                <NavLink to="/registration" activeClassName="active"><SignIn id="Login"/></NavLink>
                <SearchSVG />
                </>
            )}

            
            
        </div>
    )
}