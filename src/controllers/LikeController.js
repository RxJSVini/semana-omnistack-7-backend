const Post = require('../models/Post');
module.exports = {
    async index(req, res){
        try {
            const posts = await Post.find().sort('-createdAt')
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async store(req, res){
        try {
            const { id_post } = req.params;
            const post = await Post.findById(id_post);
            if(!post){
                return res.status(404).json({message:"Post does not found"});
            }
            
            post.likes +=1
            post.save()

            return res.status(201).json(post)

        } catch (error) {
            return res.status(500).json(error);
        }
    }

}