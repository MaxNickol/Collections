const {Schema, model} = require('mongoose');

const ItemSchema = new Schema({
    collection_id: {type:String, required:true, ref:'Collections'},
    title: {type:String, required:true, trim: true},
    tags: [{type:String, required:true}],
    comments: [{type: String, required: false}],
    likes: {type: Number, required: false},
    string_field1: {type:String, required:false},
    string_field2: {type:String, required:false},
    string_field3: {type:String, required:false},
    text_field1: {type:String, required:false},
    text_field2: {type:String, required:false},
    text_field3: {type:String, required:false},
    number_field1: {type:Number, required:false},
    number_field2: {type:Number, required:false},
    number_field3: {type:Number, required:false},
    Date_field1: {type:Date, required:false, default: Date.now},
    Date_field2: {type:Date, required:false, default: Date.now},
    Date_field3: {type:Date, required:false, default: Date.now},
    Boolean_field1: {type:Boolean, required:false},
    Boolean_field2: {type:Boolean, required:false},
    Boolean_field3: {type:Boolean, required:false},
})


module.exports = model("Item", ItemSchema);