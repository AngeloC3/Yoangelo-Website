'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var toDoItemSchema = Schema( {
  userId: ObjectId,
  title: String,
  description:String,
  priority: Number,
  completed: Boolean,
  createdAt: Date,
} );

const watchListItem = mongoose.model( 'WatchListItem', toDoItemSchema );
const bucketListItem = mongoose.model( 'BucketListItem', toDoItemSchema );

module.exports = {
  watchListItem : watchListItem,
  bucketListItem : bucketListItem
}