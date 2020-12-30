const {Schema, model} = require('mongoose');

const CollectionSchema = new Schema({
    title: {type:String, trim: true, required: true},
    description: {type:String, required: true},
    topic: {type:String, required: true, ref: "Topic"},
    items: [{type:String, required: true, ref: "Item"}]
})

module.exports = model("Collections", CollectionSchema);