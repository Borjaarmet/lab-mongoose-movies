const express = require('express');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrities.model');

const router = express.Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        console.log(celebrities.length)
        res.render('celebrities/index', {celebrities});
    })
    .catch(err => {
        console.error(`an error ocurred while listing celebrities: ${err}`)
        next(err)
        
    })
    
});



router.get('/celebrities/:id/show', (req, res, next ) => {

    const {id} = req.params
    Celebrity.findById(id)
    .then( celebrity => {
        console.log(celebrity)
        res.render('celebrities/edit', {celebrity})
    })
    .catch(err => {
        console.error(`an error ocurred while finding celebrity: ${err}`)
        next(err)
        
    })
 
})

router.get('/celebrities/new', (req,res,next) => {
    res.render('celebrities/new')
});


router.post('/celebrities/new',(req,res,next) => {
    const {name,occupation,catchPhrase} = req.body
    Celebrity.create({
        name,occupation,catchPhrase
    })
    //.save()
    .then(newCeleb => {        
        console.log(`a new celebrity has been created: ${newCeleb} `)
        res.redirect('/celebrities')
    })
    .catch(error => {
        res.render('celebrities/new',{errorMessage:"Try again!"})
    })

})

router.post('/celebrities/:id/delete', (req,res,next) => {
    Celebrity.findByIdAndRemove(req.params.id)
    .then(celebrity => {
        console.log(celebrity)
        res.redirect('/celebrities')
    })
    .catch(err => {
        console.error(`an error ocurred while deleting celebrity: ${err}`)
        next(err)
    })
})

router.get('/celebrities/:id/edit', (req, res, next)=> {
    const {id} = req.params;
    Celebrity.findById(id)
    .then(celebrity => { 
        //console.log(celebrity)    
        res.render('celebrities/show',celebrity )
    })
    .catch(err => {
        console.error(`an error ocurred while editing celebrity: ${err}`)
        next(err)
    })
})

router.post('/celebrities/:id/edit', (req, res,next) => {
    const {id} = req.params;
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(id,{name,occupation,catchPhrase},{new:true})
    
    .then(() => {
    
        res.redirect('/celebrities')
    })
    .catch((error) => {
        console.error('Try to update again!', error)
        next(error)
    })
})


  
module.exports = router;