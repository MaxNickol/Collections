const Router = require('express');
const apiController = require('../Controllers/apiController');
const parser = require('../middleware/cloudinaryMiddleware');

const router = new Router();


router.post('/createCollection', parser.single('image'), apiController.addCollection);
router.post('/profile', apiController.getProfile);
router.post('/createColleciton', apiController.addCollection);
router.post('/getAllCollections', apiController.getCollections);

router.post('/deleteCollection', apiController.delete);


module.exports = router;