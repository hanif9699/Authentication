const express = require('express');
var router = require('express-promise-router')();
var { validateBody, schema } = require('../helpers/routehelper');
const Usercontroller = require('../controller/user');
var passport = require('passport');
var passportConf = require('../passport');



router.route('/signup').post(validateBody(schema.authschema), Usercontroller.signUp);
router.route('/signin').post(validateBody(schema.authschema), passport.authenticate('local', { session: false }), Usercontroller.signIn);
router.route('/secret').get(passport.authenticate('jwt', { session: false }), Usercontroller.secret);


module.exports = router;