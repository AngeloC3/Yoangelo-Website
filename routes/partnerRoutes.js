const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const isUserSchemaDifferent = require('../exports/functions.js').isUserSchemaDifferent;
const router = require('express').Router();
const User = require('../models/User');

router.get("/partner/page/:found?", isLoggedIn, async (req, res, next) => {
    currUser = req.session.user
    userCheck = await User.findById(currUser._id)
    if (isUserSchemaDifferent(currUser, userCheck)){
        req.session.user = userCheck
        currUser = req.session.user
    }
    // rest of the method
    if (req.params.found == 'notFound'){
        res.locals.notFound = true
    }
    res.locals.partnerCode = currUser.partnerCode
    partnerId = currUser.partnerId
    if (partnerId != undefined){
        partner = await User.findById(partnerId)
        partnerUsername = partner.username
    } else {
        partnerUsername = undefined
    }
    res.locals.partnerUsername = partnerUsername
    res.render("partner");
  });

  router.post("/partner/set", isLoggedIn, async (req, res, next) => {
    const {friendName, friendCode} = req.body
    if (friendName == req.session.username || friendCode.length != 6 ){
        res.redirect('/partner/page/notFound')
        return
    }
    partner = await User.findOne({username:friendName, partnerCode:friendCode})
    if (partner != null && partner.partnerId == null){
        partnerId = partner._id
        userId = req.session.user._id
        console.log("setting partner as", partner.username)
        user = await User.findByIdAndUpdate({_id: userId}, {partnerId: partnerId}, {new: true})
        await User.findByIdAndUpdate({_id:partnerId}, {partnerId: userId})
        req.session.user = user
        ending = ""
    }
    else {
        ending = "/notFound"
    }
    res.redirect('/partner/page'+ending)
  });

  router.get("/partner/remove", isLoggedIn, async (req, res, next) => {
    partnerId = req.session.user.partnerId
    if (partnerId != null){
        userId = req.session.user._id
        await User.findByIdAndUpdate({_id:partnerId}, {partnerId: null})
        user = await User.findByIdAndUpdate({_id:userId}, {partnerId: null}, {new: true})
        req.session.user = user
    }
    res.redirect('/partner/page')
  });

  module.exports = router;
  