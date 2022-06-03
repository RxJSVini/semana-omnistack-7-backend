const { Router } = require('express');
const PostController = require('../controllers/PostController');
const LikeController = require('../controllers/LikeController');
const multer = require('multer');
const multerConfig = require('../../config/multerConfig');

const upload = multer(multerConfig);

const routes = Router();

routes.get("/posts",PostController.index);
routes.post("/posts",upload.single('image'), PostController.store);

routes.post("/posts/:id_post/likes",LikeController.store);
module.exports = routes;