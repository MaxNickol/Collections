const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {secret} = require('../config/config');

const generateAccessToken = (id, roles) => {
   return jwt.sign({id, roles}, secret, {expiresIn: "2h"});
}


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

                return res.status(201).json({message: `User ${username} has been created`})
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

            res.status(200).json({token})

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
}


module.exports = new authController();