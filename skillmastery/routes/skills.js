var express = require('express');
var router = express.Router();
const fs = require('fs');
const Person = require('../models/Person')
const Skill = require('../models/Skill')
const Evidence = require('../models/Evidence')


// Here is where we read the data from a file
let rawdata = fs.readFileSync('models/data.json','utf8');
let database = JSON.parse(rawdata);

//This variable only lasts as long as the router is not restarted
let counter = 0
console.log("loading skills router!!!")


/* GET home page. */
router.get('/raw', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send(database)
});


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
  fs.writeFileSync('models/data.json',JSON.stringify(database,null,' '));
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
