//SåHÄR SKAPAR MAN EN MODELL FÖR TODO:S


const mongoose = require('mongoose');

//// Definierar Todo-schema:
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    //Titeln är obligatorisk
    //TODO-OBJEKT SOM T.EX. KÖP MODERMJÖLKSERSÄTTNING(!)
    completed: { type: Boolean, default: false }
});
    //Standardvärdet för completed är false (inte klart)
    //BOOLEAN (true false) ANGER OM TODO:N ÄR KLAR ELLER INTE(!)
    


module.exports = mongoose.model('Todo', todoSchema);
//den här exporterar modellen för användning i andra filer

