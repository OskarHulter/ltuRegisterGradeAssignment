const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skapar schema och model för ett unikt provtillfälle. 
// 1 student + 1 kurs + 1 prov = 1 provTillfälle.
// provTillfället sparas som ett dokument med sub-dokument.
const ProvTillfalleSchema = new Schema({
    prov: {
        provKod: String
    },
    kurs: {
        kursKod: String,
        namn: String 
    }, 
    student: {
        studentId: String,
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