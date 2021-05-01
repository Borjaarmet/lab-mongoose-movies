const express = require('express');
const mongoose = require('mongoose');
const Movie = require('../models/movie.model');

const router = express.Router();

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(movies => {
        console.log(movies.length)
        res.render('movies/index', {movies});
    })
    .catch(err => {
        console.error(`an error ocurred while listing celebrities: ${err}`)
        next(err)
        
    })
    
});

router.get('/movies/:id/details', (req,res,next) => {
    Movie.findById(req.params.id)
    .then((movie) => {
        console.log(movie)
        res.render('movies/details', {movie})
    })
    .catch( err => console.log(err))
})

router.get('/movies/create', (req,res,next) => {
    res.render('movies/create')
});

router.post('/movies/create', (req, res, next) => {
    const { title,genre,plot} = req.body;
    Movie.create({title,genre,plot})
    .then((newMovie) => {
        console.log(newMovie)
        res.redirect('/movies')
    })
    .catch((err) => {
        next(err)

    })
})

router.post('/movies/:id/delete',(req,res,next) => {
   
    Movie.findByIdAndRemove(req.params.id)
    .then((movie) => {
        console.log(movie)
        res.redirect('/movies')
    })
    .catch((err) => {
        next(err)
    })
})

router.get('/movies/:id/edit', (req,res,next) => {
    const{id} = req.params
    Movie.findById(id)
    .then((movieToEdit) => {
        console.log(movieToEdit)
        res.render('movies/edit', {movie: movieToEdit})
    })
    .catch( err => console.log(err))
})

router.post('/movies/:id/edit',(req,res,next) => {
    const {id} = req.params;
    const {title,genre,plot} = req.body;
   Movie.findByIdAndUpdate(id, {title,genre,plot}, {new:true})
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err) => {
        next(err)
    })
})
module.exports = router;