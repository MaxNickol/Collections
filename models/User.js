const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, unique: true, required: true, trim: true},
    roles: [{type:String, ref:'Role', uppercase: true}],
    collections: [{type:String, ref:'Collections'}]
})

module.exports = model("User", userSchema);