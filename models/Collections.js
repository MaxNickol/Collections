const {Schema, model} = require('mongoose');

const CollectionSchema = new Schema({
    title: {type:String, trim: true, required: true},
    description: {type:String, required: true},
    image: {type: String, required: false},
    topic: {type:String, required: true},
    owner_id: {type:String, trim: true, required: true, ref:'User'}
})

module.exports = model("Collections", CollectionSchema);