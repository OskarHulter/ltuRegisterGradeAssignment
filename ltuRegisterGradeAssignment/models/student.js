const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skapar studenters schema och model

const StudentSchema = new Schema({
    namn:{
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    betygsatt: {
        type: Boolean,
        default: false
    },
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;