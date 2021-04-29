const express = require('express');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrities.model');

const router = express.Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(dataFromDB => {
        console.log(dataFromDB)
        res.render('celebrities/index', {dataFromDB});
    })
    .catch(err => {
        console.error(`an error ocurred while listing celebrities: ${err}`)
        next(err)
        
    })
    
  });
  
  module.exports = router;