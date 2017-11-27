const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const ProvTillfalle = require('../models/provTillfalle');

//get a list of provTillfallen from the db
router.get('/provtillfallen', function(req, res, next){
    ProvTillfalle.find({}).then(function(provTillfallen){
        res.send(provTillfallen);
    });
});

//add a new provTillfalle to the db
router.post('/provtillfallen', function(req, res, next){
    ProvTillfalle.create(req.body).then(function(provTillfalle){
        res.send(provTillfalle);
    }).catch(next);
});
//update a provTillfalle in the db
router.put('/provtillfallen/:id', function(req, res, next){
    ProvTillfalle.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}).then(function(provTillfalle){
        res.send(provTillfalle);
    })
});

//delete a provTillfalle from the db
router.delete('/provtillfallen/:id', function(req, res, next){
    Student.findByIdAndRemove({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});


//get a list of students from the db
router.get('/students', function(req, res, next){
    Student.find({}).then(function(students){
        res.send(students);
    });
});

//add a new student to the db
router.post('/students', function(req, res, next){
    Student.create(req.body).then(function(student){
        res.send(student);
    }).catch(next);
});
//update a student in the db
router.put('/students/:id', function(req, res, next){
    Student.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}).then(function(student){
        res.send(student);
    })
});

//delete a student from the db
router.delete('/students/:id', function(req, res, next){
    Student.findByIdAndRemove({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});

module.exports = router;