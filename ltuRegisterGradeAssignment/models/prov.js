const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//testing this
const Kurs = require('../models/kurs');
const Student = require('../models/student');
const KursSchema = new Schema({})
// Skapar provtillfällens schema och model 
const ProvSchema = new Schema({
    student: {
        type: String
    },
    betyg: {
        type: String
    },
    betygsatt: {
        type: Boolean,
        default: false
    },
    datum: {
        type: String,
        default: "2017-11-26"
    }
});

const Prov = mongoose.model('prov', ProvSchema);

module.exports = Prov;