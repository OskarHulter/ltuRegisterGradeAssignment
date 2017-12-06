const express = require('express');
const router = express.Router();
const ProvTillfalle = require('../models/provTillfalle');

//Hämtar en lista över provTillfallen från db
router.get('/provtillfallen', function(req, res, next){
    ProvTillfalle.find({}).then(function(provTillfallen){
        res.send(provTillfallen);
    });
});

//Lägger till ett provTillfalle till db
router.post('/provtillfallen', function(req, res, next){
    ProvTillfalle.create(req.body).then(function(provTillfalle){
        res.send(provTillfalle);
    }).catch(next);
});

//Uppdaterar ett provTillfalle i db
router.put('/provtillfallen/:id', function(req, res, next){
    ProvTillfalle.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}).then(function(provTillfalle){
        res.send(provTillfalle);
    });
});

//Tar bort provTillfalle från db
router.delete('/provtillfallen/:id', function(req, res, next){
    ProvTillfalle.findByIdAndRemove({_id: req.params.id}).then(function(provTillfalle){
        res.send(provTillfalle);
    });
});

module.exports = router;