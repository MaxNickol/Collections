const {Schema, model} = require('mongoose');

const TopicSchema = new Schema({
    value: {type:String, trim: true, required: true}
})

module.exports = model("Topic", TopicSchema);