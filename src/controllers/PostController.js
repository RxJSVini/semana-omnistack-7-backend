const Post = require('../models/Post');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        
        try {
            const posts = await Post.find().sort('-createdAt');
          
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    async store(req, res) {
        try {
            const { filename: image } = req.file;
            
            const [name] = image.split(".");
            const fileName = `${name}.jpg`;

            Jimp.read(req.file.path, (err, file) => {
                if (err) throw err;
                file
                    .resize(300, 200) 
                    .quality(70)
                    .writeAsync(path.resolve(__dirname, '..', '..', 'uploads', 'resized', fileName));
            })
                .catch(err => {
                    console.error(err.message);
                });


            fs.unlinkSync(req.file.path)

            const post = await Post.create({
                author: req.body.author,
                place: req.body.place,
                description: req.body.description,
                hashtags: req.body.hashtags,
                image: fileName

            })
   
            req.io.emit("post", post);

            return res.json(post)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}