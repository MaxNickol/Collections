const Router = require('express');
const apiController = require('../Controllers/apiController');

const router = new Router();


router.post('/createCollection', apiController.addCollection);
router.post('/profile', apiController.getProfile);
router.post('/createColleciton', apiController.addCollection);
router.post('/getAllCollections', apiController.getCollections);

module.exports = router;