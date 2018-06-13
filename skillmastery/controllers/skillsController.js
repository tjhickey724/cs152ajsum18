'use strict';
const Skill = require( '../models/skill' );
console.log("loading the skills Controller")


// this displays all of the skills
exports.getAllSkills = ( req, res ) => {
  console.log('in getAllSkills')
  Skill.find( {} )
    .exec()
    .then( ( skills ) => {
      console.log("skills = "+skills)
      res.render( 'skills', {
        skills: skills
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'skill promise complete' );
    } );
};




exports.saveSkill = ( req, res ) => {
  console.log("in saveSkill!")
  console.dir(req)
  let newSkill = new Skill( {
    name: req.body.name,
    description: req.body.description
  } )

  console.log("skill = "+newSkill)

  newSkill.save()
    .then( () => {
      res.redirect( '/skills' );
    } )
    .catch( error => {
      res.send( error );
    } );
};
