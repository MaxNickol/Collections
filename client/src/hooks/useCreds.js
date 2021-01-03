import {useState, useEffect, useCallback} from 'react'

export const useCreds = () => {

    const [creds, setCreds] = useState({
        token: '',
        username: '',
        roles: []
    });

    const credsInfo = "CredsInfo"

    const login = useCallback((jwt, username, roles) => {
        
        setCreds({token:jwt, username:username, roles: roles[0]});

        localStorage.setItem(credsInfo, JSON.stringify({token: jwt, username: username, roles: roles}));
    }, [])

    const logout = useCallback(() => {
        setCreds({token:null, username:null, roles:null});

        localStorage.removeItem(credsInfo);
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(credsInfo));
    
        
        if(data) {
            login(data.token, data.username, data.roles)
        }

    }, [login])
    

    return {login, creds, logout};

}