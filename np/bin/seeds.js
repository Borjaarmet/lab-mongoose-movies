const mongoose = require('mongoose');
const Celebrity= require('../models/celebrities.model')

mongoose
  .connect('mongodb://localhost/mongoose-movies-dev', {
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