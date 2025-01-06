//HÄR SKAPAR VI MONGOOSE-MODELLEN FÖR ATT VÅR TODO(!)

const mngoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //Titeln är obligatorisk
        //TODO-OBJEKT SOM T.EX. KÖP MODERMJÖLKSERSÄTTNING(!)
    },
    completed: {
        type: Boolean,
        default: false //Standardvärdet för completed är false (inte klart)
        //BOOLEAN ANGER OM TODO:N ÄR KLAR ELLER INTE(!)
    }
});

module.exports = mongoose.model('Todo', todoSchema);

//ATT GÖRA/INFO TILL MIG SJÄLV: Läs på mer om todo.js och obligatoriska koderna(!)