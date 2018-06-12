var express = require('express');
var router = express.Router();
const fs = require('fs');
const Person = require('../models/Person')
const Skill = require('../models/Skill')
const Evidence = require('../models/Evidence')
const SquareInfo = require('../models/SquareInfo')

console.log("inside router ...")
// Here is where we read the data from a file
let rawdata = fs.readFileSync('../database/data.json','utf8');
let database = JSON.parse(rawdata);
console.log("just read database!")
console.log(`Here are the squares ${database.squares.map((x)=>(x.toString()))}`)

//This variable only lasts as long as the router is not restarted
let counter = 0
console.log("loading skills router!!!")

//let squares = []

/* GET home page. */
router.get('/raw', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send(database)
});

router.get('/test',function(req,res,next){
  res.send("hello!")
})

router.get('/square',function(req, res, next){
  console.log("inside get square")
  res.render('square',{x:0,square:0,squares:[]})
})

router.post('/square',function(req, res, next){
  console.log('inside post square')
  const x = parseInt(req.body.x )
  const square = x*x
  const sqinfo = new SquareInfo(x,square)
  database.squares.push(sqinfo)
  fs.writeFileSync('../database/data.json',JSON.stringify(database,null,' '));
  res.render('square',{x:x, square:square, squares:database.squares}) //:x,square:square,squares:squares})
})

router.get('/show', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  counter++
  console.dir(database)
  console.dir(database.skills)
  res.render('showSkills',
      {info:'skill info',
      skills:database.skills,
      people:database.people,
      evidence:database.evidence,
      counter:counter,
    })
});

router.post('/show', function(req, res, next){
  counter++
  console.log(req.body.skill)
  console.log(req.body.student)
  console.log(req.body.evidence)
  let e = new Evidence(req.body.student, req.body.skill, req.body.evidence)
  console.log('Just loaded ',e)
  database.evidence.push(e)
  // here is where we write the modified data back to the disk
  fs.writeFileSync('../database/data.json',JSON.stringify(database,null,' '));
  // and we send them back to the same page ...
  res.render('showSkills',
      {info:'skill info',
      skills:database.skills,
      people:database.people,
      evidence:database.evidence,
      counter:counter
    })
})

module.exports = router;
