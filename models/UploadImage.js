const {Schema, model} = require('mongoose');


const UploadImage = new Schema({
    filename: {type:String, required:true, trim:true},
    url: {type:String, required:true},
    collection_title: {type: String, ref:"Collections", require: true}
})

module.exports = model('UploadImage', UploadImage);