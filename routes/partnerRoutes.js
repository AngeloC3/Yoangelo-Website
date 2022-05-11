const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const router = require('express').Router();
const User = require('../models/User');

router.get("/partner", isLoggedIn, async (req, res, next) => {
    res.locals.partnerCode = req.session.user.partnerCode
    partnerId = req.session.user.partnerId
    if (partnerId == undefined){
        partner = undefined
    } else {
        partner = await User.findOne({username:username})
    }
    res.locals.partner = partner
    res.render("partner");
  });

  module.exports = router;
  