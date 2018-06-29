'use strict'
const axios = require('axios');

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('starwars')
}

exports.renderFilm =  (req,res) => {
  //console.log("in the swController.renderMain")
  const n = parseInt(req.params.filmNum)
  const film = res.locals.data.results[n]
  res.render('starwarsFilm',{film:film,n:n})
}

exports.attachFilms = (req,res,next) => {
  console.log("in attachFilms")
  axios.get('http://swapi.co/api/films')
    .then(response => {
      console.log(JSON.stringify(response.data,null,1));
      res.locals.data = response.data
      next()
    })
    .catch(error => {
      console.log('BIG ERROR in attachFilms');
    });
}
