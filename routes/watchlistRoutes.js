const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const isUserSchemaDifferent = require('../exports/functions.js').isUserSchemaDifferent;
const router = require('express').Router();
const WatchListItem = require('../models/ToDoItem').watchListItem;
const User = require('../models/User');

router.get("/watchlist", isLoggedIn, async (req, res, next) => {
    currUser = req.session.user
    userCheck = await User.findById(currUser._id)
    if (isUserSchemaDifferent(currUser, userCheck)){
        req.session.user = userCheck
        currUser = req.session.user
    }
    userId = currUser._id
    partnerId = currUser.partnerId
    res.locals.watch_list =  await WatchListItem.find({'userId': {$in: [userId, partnerId]} })
    res.render("watchlist");
  });
  
router.get("/watchlist/add", isLoggedIn, (req, res, next) => {
    res.render("watchlistForm");
  });
  
router.post("/watchlist/add", isLoggedIn, async (req, res, next) => {
    const {titleInput, descriptionArea, prioritySelect} = req.body
    const item = new WatchListItem({
      userId: req.session.user._id,
      title: titleInput,
      description: descriptionArea,
      priority: prioritySelect,
      completed: false,
      createdAt: new Date(),
      addedBy: req.session.username,
    })
    await item.save()
    res.redirect("/watchlist")
  });
  
router.get("/watchlist/delete/:itemId", isLoggedIn, async (req, res, next) => {
    try{
      const itemId=req.params.itemId; 
      await WatchListItem.deleteOne({_id:itemId}) 
      res.redirect('/watchlist')
    } catch (e){
      next(e);
    }
  });
  
router.get("/watchlist/setCompleted/:itemId/:bool", isLoggedIn, async (req, res, next) => {
    try{
      const itemId=req.params.itemId;
      const completed = req.params.bool=='true';
      await WatchListItem.findByIdAndUpdate(itemId,{completed})
      res.redirect('/watchlist')
    } catch (e){
      next(e);
    }
  });

module.exports = router;