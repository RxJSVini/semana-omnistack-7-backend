const { Schema, model} = require('mongoose');

const PostSchema = new Schema({
    author:String,
    place:String,
    description:String,
    hashtags:String,
    image:String,
    likes:{
        type:Number,
        default:0
    }

}, {
    timestamps:true
}, {
    toJSON:{
        virtuals:true,
    }
});


PostSchema.virtual('image_url').get(function(){
    return `http://localhost:3333/files/${this.image}`
})

module.exports = model("Post", PostSchema);