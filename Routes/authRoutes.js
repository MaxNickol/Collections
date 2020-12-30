const Router = require('express');
const controller = require('../Controllers/authController');
const {check} = require('express-validator');

const rolesMiddleware = require('../middleware/rolesMiddleware');

const router = new Router();

router.post('/registration', [
    check("username", "Username can\'t be blank").notEmpty(),
    check("password", "Password can\'t be blank. Only > 4 < 10").isLength({min: 4, max: 10}),
    check("email", "Email should be real").isEmail()
], controller.registration);
router.post('/login', controller.login);
router.get('/users', rolesMiddleware(["ADMIN", "MODERATOR", "USER"]), controller.getUsers);


module.exports = router;