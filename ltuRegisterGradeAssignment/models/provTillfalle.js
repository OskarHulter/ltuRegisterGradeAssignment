const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skapar provtillfällens schema och model 
const ProvTillfalleSchema = new Schema({
    kurs: {
        namn: String,
        kursKod: String
    }, 
    student: {
        namn: String,
        pnr: Number
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

const ProvTillfalle = mongoose.model('provTillfalle', ProvTillfalleSchema);

module.exports = ProvTillfalle;