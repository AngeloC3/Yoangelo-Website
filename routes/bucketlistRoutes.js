const isLoggedIn = require('../exports/functions.js').isLoggedIn;
const checkUserChange = require('../exports/functions.js').checkUserChange;
const router = require('express').Router();
const BucketListItem = require('../models/ToDoItem').bucketListItem;
const User = require('../models/User');

router.get("/bucketlist", isLoggedIn, async (req, res, next) => {
    // check if change in user has been made by someone else
    checkUserChange(req)
    currUser = req.session.user
    // rest of method
    userId = currUser._id
    partnerId = currUser.partnerId
    res.locals.item_list =  await BucketListItem.find({'userId': {$in: [userId, partnerId]} })
    res.locals.list_name = "bucket list"
    res.locals.addRoute = "/bucketlist/add"
    res.locals.setCompletedRoute = '/bucketlist/setCompleted/REPLACE-ELEM/true'
    res.locals.setUncompletedRoute = '/bucketlist/setCompleted/REPLACE-ELEM/false'
    res.locals.deleteRoute = '/bucketlist/delete/REPLACE-ELEM'
    res.render("toDo");
  });

router.get("/bucketlist/add", isLoggedIn, (req, res, next) => {
  res.locals.formRoute = "/bucketlist/add"
  res.render("toDoForm");
});

router.post("/bucketlist/add", isLoggedIn, async (req, res, next) => {
  const {titleInput, descriptionArea, prioritySelect} = req.body
  const item = new BucketListItem({
    userId: req.session.user._id,
    title: titleInput,
    description: descriptionArea,
    priority: prioritySelect,
    completed: false,
    createdAt: new Date(),
    addedBy: req.session.username,
  })
  await item.save()
  res.redirect("/bucketlist")
});

router.get("/bucketlist/delete/:itemId", isLoggedIn, async (req, res, next) => {
  try{
    const itemId=req.params.itemId; 
    await BucketListItem.deleteOne({_id:itemId}) 
    res.redirect('/bucketlist')
  } catch (e){
    next(e);
  }
});

router.get("/bucketlist/setCompleted/:itemId/:bool", isLoggedIn, async (req, res, next) => {
  try{
    const itemId=req.params.itemId;
    const completed = req.params.bool=='true';
    await BucketListItem.findByIdAndUpdate(itemId,{completed})
    res.redirect('/bucketlist')
  } catch (e){
    next(e);
  }
});

 module.exports = router;