'use strict'

exports.renderMain =  (req,res) => {
  //console.log("in the indexController.renderMain")
  res.render('index',{title:"AuthDemo"})
}
