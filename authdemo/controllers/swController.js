'use strict';
console.log("loading the starwars Controller")
const axios = require('axios');

exports.renderMain = ( req, res ) => {
  res.render('starwars')
}

exports.renderFilm = ( req, res ) => {
  const k = parseInt(req.params.k)
  res.render('starwarsfilm',{film: res.locals.films[k]})
}

exports.attachFilms = (req,res,next) => {
  axios.get('http://swapi.co/api/films')
    .then(response => {
      console.log(JSON.stringify(response.data));
      res.locals.films = response.data.results
      next()
    })
    .catch(error => {
      console.log(error);
    });
}
