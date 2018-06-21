'use strict';
const mongoose = require( 'mongoose' );

var evidenceSchema = mongoose.Schema( {
  student: String,
  skill: String,
  url: String,
  description: String
} );

module.exports = mongoose.model( 'Evidence', evidenceSchema );
