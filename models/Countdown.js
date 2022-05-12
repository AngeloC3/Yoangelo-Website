'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var countdownSchema = Schema( {
  userId: ObjectId,
  title: String,
  endTime: Date,
} );

module.exports = mongoose.model( 'Countdown', countdownSchema );
