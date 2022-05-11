'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var userSchema = Schema( {
  username: String,
  passphrase: String,
  partnerID: ObjectId,
  partnerCode: String, // NEEDS TO BE ADDED IN AUTH? same was ay passphrase?
} );

module.exports = mongoose.model( 'User', userSchema );
