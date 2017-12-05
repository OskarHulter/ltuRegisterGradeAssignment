const express = require('express');
const router = express.Router();
//const Student = require('../models/student');
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
    Student.findByIdAndRemove({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});

/*
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
*/
module.exports = router;