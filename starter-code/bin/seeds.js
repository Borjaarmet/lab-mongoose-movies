const mongoose = require('mongoose');
const Celebrity= require('../models/celebrities.model')
const Movie = require('../models/movie.model')
mongoose
  .connect('mongodb://localhost/mongoose-movies-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 
const celebrities = [
    {name: 'Lionel Messi', occupation: 'Footballer', catchPhrase: 'god'},
    {name: 'Beyonce', occupation: 'Musician', catchPhrase: 'music'},
    {name: 'J.K.Rowling', occupation: 'Writer', catchPhrase: 'Harry Potter'}
];

Celebrity.create(celebrities)
    .then(dataFromDB => {
        console.log(`celebrities created: ${dataFromDB.length}`)
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(`an error ocurred while creating the DB`, err)
    })

module.exports = Celebrity;


const testMovies = [
  {
      title: 'Wolfwalkers',
      genre: 'animation, fantasy',
      plot: 'Hunter girl turns into a wolf.'
  },
  {
      title: 'Isle of dogs',
      genre: 'stop-motion, science-fiction',
      plot: "Let's put all the dogs in one island."
  },
  {
      title: 'Pulp Fiction',
      genre: 'comedy, thriller',
      plot: 'Three different plots.'
  }
];
Movie.create(testMovies)
  .then((moviesFromDB)=> {
    console.log(`movies created in the data base: ${moviesFromDB.length}`)
    mongoose.connection.close()
  })
  .catch( error => console.log(error))
