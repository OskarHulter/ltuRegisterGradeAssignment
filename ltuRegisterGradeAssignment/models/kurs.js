const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skapar kursers schema och model
const KursSchema = new Schema({
    namn:{
        type: String,
        required: [true, 'Name field is required']
    },
    kursKod: {
        type: String
    }
});

const Kurs = mongoose.model('kurs', KursSchema);

module.exports = Kurs;