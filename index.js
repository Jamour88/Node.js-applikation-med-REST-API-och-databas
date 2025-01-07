const express = require('express');
//express skapar min server.


const bodyParser = require('body-parser');
// bodyparser ska hantera inkommande jsondata dvs info.


// info till mig sj: ovanstående paket(ramverk dvs bibliotek) hamnar under package.json och dependencies. Dessa är alltså färdiga paket.


const app = express();
//Denna rad skapar min Express-app(!)

// nedanstående rad har jag behövt ta bort eftersom det annars blir två const i JS. 
// const PORT = 4000
//Denna skapar alltså egen kod/port för att sedan konopplas till min IP-kod. 3000 är en standardsiffra men man kan även använda annat nummer men jag har problem att använda de vanliga port-koderna.  
//Alltså istället använder jag koden nedan. Den hämtar PORT från miljövariabler dvs fr. min .env mapp som finns under rootmappen.
const PORT = process.env.PORT || 4000;


require('dotenv').config();
//ovanstående rad gör att jag kan läsa in variabler från .env-filen och använda dem i min kod. Jag kan nu få tillgång till DATABASE_URL med process.env.DATABASE_URL.
//OBS OBS OBS OBS OBS!!!! är denna samma som nedan eller kan ersätta den koden? Kolla upp Jamour!
//dotenv.config();
//finns till för att skapa säker plats för känslig info.
//sparas i .env-fil som jag placerar i gitignore?
//jag vill inte att den syns på git.
//.env kan läggas som separat fil i jsonpackage.


const mongoose = require('mongoose');
//mongoose är som en organisatör, ska hantera databas alltså skapa modeller för att interagera med den datan, och sedan utföra operationer som att skapa, läsa, uppdatera och ta bort dokument i databasen.


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Ansluten till databasen'))
  .catch(err => console.error('Fel vid anslutning till databasen:', err));
  //ovanstående ansluter till databasen (MongoDB)
  //I denna kod anropas process.env.DATABASE_URL för att hämta värdet av miljövariabeln och använda den i mongoose.connect().


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//den här startar servern.
//den här är samma sak som nedanstående två rader ( att ha båda skapade konflikt):
//app.listen(4000, () => {
//console.log("Server is running on port 4000.");
//observera att emplate literals (${}) ger ett enkelt och läsbart sätt att infoga variabler i strängar,
//Även denna kod hade funkat: console.log('Servern kör på port ' + port);


app.use(express.json());
//ovanstående rad ersattes med: app.use(bodyParser.json()); detta eftersom express redan har inbyggd express.json
//middleware, denna läser json-data i post-requests
//läser jsondata i förfrågningar
//Body-parser fungerar som den som öppnar och läser innehållet i ett paket (data från en POST-förfrågan).




  

//NEDAN SKAPAR JAG API FÖR ATT HANTERA MINA TODO:S(!)

//POST /todos: Skapa en ny Todo.
//GET /todos: Hämta alla Todos.
//GET /todos/:id: Hämta en specifik Todo baserat på ID.
//PUT /todos/:id: Uppdatera en Todo.
//DELETE /todos/:id: Radera en Todo.

app.get('/', (req, res) => {
    res.send('Välkommen till Jamours Todo API App :-) ');
}); //Den här definierar enkel GET-route som svarar på root-URL:en.

// Nedan importerar modellen från todo.js som finns i min models-mapp
const Todo = require('./models/Todo');

//Nedan skapar min en ny Todo (POST):

app.post('/todos', async (req, res) => {
    try {
        const { title } = req.body;
        //Hämtar titel från JSON-body
        const todo = new Todo({
            title,
            completed: false
            //Skapa en ny Todo med completed = false
        });
        await todo.save();
        //Sparar den nya Todo:n i databasen
        res.status(201).json(todo);
        //Returnerar den skapade Todo:n som svar
    } catch (err) {
        res.status(400).json({ error: 'Failed to create todo.' });
        //Felhantering
    }
});

//Nedan hämtar alla Todos (GET):

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        //Hämtar alla Todos från databasen
        res.status(200).json(todos); 
        //Returnera alla Todos som JSON
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos.' });
        //Felhantering
    }
});

//Nedan hämtar en Todo med ID (GET):

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        //Hämta Todo:n med specifikt ID
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
            //Om Todo:n inte finns ska det returneras 404
        }
        res.status(200).json(todo);
        //Returnera Todo:n som JSON
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todo.' });
        //Felhantering
    }
});

// Nedan uppdatera en Todo (PUT):

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        //Uppdatera Todo:n med nytt innehåll
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' }); 
            //Om Todo:n inte finns, returnera 404
        }
        res.status(200).json(todo);
        //Returnerar den uppdaterade Todo:n
    } catch (err) {
        res.status(400).json({ error: 'Failed to update todo.' }); 
        //Felhantering
    }
});

// Nedan raderar en Todo (DELETE):

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        //Raderar Todo:n med specifikt ID
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found.' });
            //Om Todo:n inte finns ska returnera 404
        }
        res.status(200).json({ message: 'Todo deleted successfully.' });
        //Bekräftelse att Todo:n är raderad
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo.' });
        //fel
    }
});