const express = require('express');
//express skapar min server.

const mongoose = require('mongoose');
//mongoose är som en organisatör, ska hantera databas alltså skapa modeller för att interagera med den datan, och sedan utföra operationer som att skapa, läsa, uppdatera och ta bort dokument i databasen.

const bodyParser = require('body-parser');
// bodyparser ska hantera inkommande jsondata dvs info.

const cors = require('cors');




//ovanstående paket(ramverk dvs bibliotek) hamnar under package.json och dependencies. Dessa är alltså färdiga paket.

//finns till för att skapa säker plats för känslig info.
//sparas i .env-fil som jag placerar i gitignore.
//jag vill inte att den syns på git.
//.env kan läggas som separat fil i jsonpackage.

require('dotenv').config();
//ovanstående rad gör att jag kan läsa in variabler från .env-filen och använda dem i min kod. Jag kan nu få tillgång till DATABASE_URL med process.env.DATABASE_URL.
//ALLTSÅ laddar miljövariabler från .env-filen
//OBS OBS OBS OBS OBS!!!! är denna samma som nedan eller kan ersätta den koden? Kolla upp Jamour!
//dotenv.config();




const app = express()
//Denna rad skapar min Express-app(!)

// const PORT = 60080
// Ovanstående rad har jag behövt ta bort eftersom det annars blir två const i JS. Denna kod tar jag bort eftersom den enbart sätter porten till 60080 utan att behålla miljövariabler, se rad 
//Denna skapar egen kod/port för att sedan konopplas till min IP-kod. 3000 är en standardsiffra men man kan även använda annat nummer men jag har problem att använda de vanliga port-koderna.  



//här hämta PORT från miljövariabler dvs fr. min .env mapp som finns under rootmappen
const PORT = process.env.PORT || 60080;

app.listen(PORT, () => {
})
//här körs servern på http://localhost:60080.

//Startar servern och lyssna på den definierade porten:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use(cors()); //Middleware, tillåter cors. middleware ska alltid finnas i index.js. Morgan är oxå en middleware fuktion som loggar olika req, dvs när det kommer get-requests.

app.use(bodyParser.json());
//middleware, denna läser json-data i post-requests
//läser jsondata i förfrågningar
//Body-parser fungerar som den som öppnar och läser innehållet i ett paket (data från en POST-förfrågan).


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database.");
  }).catch((err) => {
    console.error("Database connection error:", err);
  });
  //ovanstående ansluter till databasen (MongoDB)


app.listen(60080, () => {
    console.log("Server is running on port 60080.");
});
//Här säger vi till servern att börja lyssna på port 60080(!)
//Så varje gång vi besöker http://localhost:60080 i webbläsaren eller skickar en API-förfrågan till den porten kommer vår server att svara.




//NEDAN SKAPAR JAG API FÖR ATT HANTERA MINA TODO:S(!)

//POST /todos: Skapa en ny Todo.
//GET /todos: Hämta alla Todos.
//GET /todos/:id: Hämta en specifik Todo baserat på ID.
//PUT /todos/:id: Uppdatera en Todo.
//DELETE /todos/:id: Radera en Todo.



// Nedan importera modellen från todo.js som finns i min models-mapp
const Todo = require('./models/Todo');

// Nedan skapa en ny Todo (POST):

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