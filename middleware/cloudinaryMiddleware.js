const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const {cloud} = require('../config/config');

cloudinary.config({
    cloud_name: cloud.cloudName,
    api_key: cloud.APIKey,
    api_secret: cloud.APISecret
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'images',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{width: 250, height:250, crop: 'limit'}]
    }
})

const parser = multer({storage: storage});

module.exports = parser;