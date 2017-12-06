const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skapar schema och model för ett unikt provtillfälle: 1 student + 1 kurs + 1 prov = 1 provTillfälle.
// provTillfället sparas alltså som ett dokument med sub-dokument i form av student, kurs & prov.
// prov dokumentet existerar bara ifall andra system håller reda på ett prov via en provKod.
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