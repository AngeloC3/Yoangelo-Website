const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const isUserSchemaDifferent = require('../exports/functions.js').isUserSchemaDifferent;
const checkUserChange = require('../exports/functions.js').checkUserChange;
const router = require('express').Router();
const User = require('../models/User');
const Countdown = require('../models/CountDown');

router.get("/countdowns", isLoggedIn, async (req, res, next) => {
    // check if change in user has been made by someone else
    checkUserChange(req)
    currUser = req.session.user
    // rest of method
    res.render("blank")
  });

module.exports = router;