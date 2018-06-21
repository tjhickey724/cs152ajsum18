'use strict';
const Evidence = require( '../models/evidence' );
console.log("loading the Evidence Controller")


// this displays all of the skills
exports.getAllEvidence = ( req, res ) => {
  console.log('in getAllEvidence')
  Evidence.find( {} )
    .exec()
    .then( ( evidence ) => {
      res.render( 'evidence', {
        evidence: evidence,
        user:req.user
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'evidence promise complete' );
    } );
};




exports.saveEvidence = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newEvidence = new Evidence( {
    student: req.body.student,
    skill: req.body.skill,
    url: req.body.url,
    description: req.body.description,
  } )

  //console.log("skill = "+newSkill)

  newEvidence.save()
    .then( () => {
      res.redirect( '/evidence' );
    } )
    .catch( error => {
      res.send( error );
    } )
  }


exports.deleteEvidence = (req, res) => {
  console.log("in deleteEvidence")
  let evidenceName = req.body.evidenceID
  if (typeof(evidenceName)=='string') {
      Evidence.deleteOne({_id:evidenceName})
           .exec()
           .then(()=>{res.redirect('/evidence')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(evidenceName)=='object'){
      Evidence.deleteMany({_id:{$in:evidenceName}})
           .exec()
           .then(()=>{res.redirect('/evidence')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(evidenceName)=='undefined'){
      console.log("This is if they didn't select a skill")
      res.redirect('/evidence')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown evidenceName: ${evidenceName}`)
  }
}
