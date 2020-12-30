const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

module.exports = function(roles) {
    
    return function(req, res, next) {
        //Only for loggedin users and ADMIN;
        if(req.method === "OPTIONS") {
            next();
        };
    
        try{
            const token = req.headers.authorization.split(' ')[1];
            
    
            if(!token) {
                return res.status(403).json({message: "You are not logged in"});
            }
            else{
    
                const {roles: userRoles} = jwt.verify(token, secret);
                
                let hasRole = false;

                userRoles.forEach(role => {
                    if(roles.includes(role)) {
                        hasRole = true;
                    }
                })

                if(!hasRole) {
                    return res.status(403).json({message: "You are not allowed to do that"});
                }
                next()
            }
           
        }
        catch(e) {
            console.log(e);
            return res.status(403).json({message: "You are not logged in"})
        }
    }
}