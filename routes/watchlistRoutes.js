const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const checkUserChange = require('../exports/functions.js').checkUserChange;
const router = require('express').Router();
const WatchListItem = require('../models/ToDoItem').watchListItem;
const User = require('../models/User');

router.get("/watchlist", isLoggedIn, async (req, res, next) => {
    // check if change in user has been made by someone else
    checkUserChange(req)
    currUser = req.session.user
    // rest of method
    userId = currUser._id
    partnerId = currUser.partnerId
    res.locals.item_list =  await WatchListItem.find({'userId': {$in: [userId, partnerId]} })
    res.locals.list_name = "watch list"
    res.locals.addRoute = "/watchlist/add"
    res.locals.setCompletedRoute = '/watchlist/setCompleted/REPLACE-ELEM/true'
    res.locals.setUncompletedRoute = '/watchlist/setCompleted/REPLACE-ELEM/false'
    res.locals.deleteRoute = '/watchlist/delete/REPLACE-ELEM'
    res.render("toDo");
  });
  
router.get("/watchlist/add", isLoggedIn, (req, res, next) => {
    res.locals.formRoute = "/watchlist/add"
    res.render("toDoForm");
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