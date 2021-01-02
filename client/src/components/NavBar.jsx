import React from 'react'
import {ReactComponent as UserSVG} from '../layout/User.svg';
import {ReactComponent as SettingsSVG} from '../layout/settings.svg';
import {ReactComponent as SearchSVG} from '../layout/search.svg';
import {ReactComponent as PlusSVG} from '../layout/plus.svg';
import {ReactComponent as PowerButton} from '../layout/power-button.svg';

export const NavBar = ({onClick}) => { 
    return(
        <div className="NavBar">

            <UserSVG onClick={() => onClick()}/>
            <SearchSVG />
            <PlusSVG />
            <SettingsSVG />

            <div className="button-wrapper">
                <PowerButton />
            </div>
        </div>
    )
}