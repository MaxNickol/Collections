const {Schema, model} = require('mongoose');

const CollectionSchema = new Schema({
    title: {type:String, trim: true, required: true},
    description: {type:String, required: true},
    image_url: {type: String, required: false},
    topic: {type:String, required: true},
    owner_username: {type:String, trim: true, required: true, ref:'User'}
})

module.exports = model("Collections", CollectionSchema);