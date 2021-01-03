const User = require('../models/User');
const Role = require('../models/Role');

const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {secret} = require('../config/config');
const generateAccessToken = require('../utils/generateJWT');



class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message:"Error during the registration", errors})
            }

            const {email, username, password} = req.body;
            const candidate = await User.findOne({email});

            if(candidate) {
                return res.status(401).json({message:"User with this email already exists"});
            }
            else { 
                const hashedPassword = bcrypt.hashSync(password, 5);
                const userRole = await Role.findOne({value:"USER"});

                const user = await new User({
                    email: email,
                    username: username,
                    password: hashedPassword,
                    roles: [userRole.value]
                });

                await user.save();

                const token = generateAccessToken(user._id, user.roles);

                return res.status(201).json({token, username: user.username, roles: user.roles})
            }


        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Registration error"})            
        }
    }

    async login(req, res) {
        try{
            const {username, password} = req.body;

            const user = await User.findOne({username})

            if(!user) {
                return res.status(400).json({message: `${username} is not found`})
            }

            const comparedPassword = bcrypt.compareSync(password, user.password);

            if(!comparedPassword) {
                return res.status(400).json({message: "Invalid password"})
            }

            const token = generateAccessToken(user._id, user.roles);

            res.status(200).json({token, roles:user.roles, username: user.username});

        } catch(e) {
            console.log(e);
            res.status(400).json({error: "Login error"})        
        }
    }

    async getUsers(req, res) {
        try{
            const users = await User.find()
            res.json({users})
        } catch(e) {

        }
    }


    async succesGoogle(req, res) {
        if(req.user) {
            const token = generateAccessToken(req.user._id, req.user.roles);
             res.json({message: "You are logged in", token: token});
         }
         else { 
             res.json({message: "Wrong request"})
         }
    }

    async failedGoogle(req, res) {
        res.json({message: "Invalid credentials. Logging in failed"})
    }

    async logoutGoogle(req, res) {
        req.logout();
        res.redirect('/');
    }
}


module.exports = new authController();