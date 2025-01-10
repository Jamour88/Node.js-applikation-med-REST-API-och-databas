const express = require('express');
//express skapar min server.

const bodyParser = require('body-parser');
// bodyparser ska hantera inkommande jsondata dvs info.
//importerar nödvändiga moduler

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

//middleware, denna läser json-data i post-requests
app.use(express.json());
//ovanstående rad ersattes med: app.use(bodyParser.json()); detta eftersom express redan har inbyggd express.json
//läser jsondata i förfrågningar
//Body-parser fungerar som den som öppnar och läser innehållet i ett paket (data från en POST-förfrågan).


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Jättebra! Äntligen är du ansluten till databasen MongoDB utan massa bugg!!!'))
  .catch(err => console.error('Aj då! Fel vid anslutning till databasen MongoDB!', err));
  //ovanstående ansluter till databasen (MongoDB)
  //I denna kod anropas process.env.DATABASE_URL för att hämta värdet av miljövariabeln och använda den i mongoose.connect().

  const server = app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}.`);
  });
  
  server.on('error', handleError);
  
  function handleError(err) {
      if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} ANVÄNDS REDAN(!).`);
      } else {
          console.error('Server encountered an error:', err);
      }
  }
  

//error-lyssnare

//NEDAN SKAPAR JAG API FÖR ATT HANTERA MINA TODO:S(!)

//POST /todos: Skapa en ny Todo.
//GET /todos: Hämta alla Todos.
//GET /todos/:id: Hämta en specifik Todo baserat på ID.
//PUT /todos/:id: Uppdatera en Todo.
//DELETE /todos/:id: Radera en Todo.

// Modell för inköpslistan (denna skulle jag kunnat ha haft i separat fil oxå)
const ShoppingItem = mongoose.model('ShoppingItem', new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchased: { type: Boolean, default: false }
}));



  //root-routes (skulle kunnat ha haft egen fil)
app.get('/', (req, res) => {
    res.send('Varmt välkommen till din inköpslista API :) ');
}); //Den här definierar enkel GET-route som svarar på root-URL:en.

// Lokal array för att spara artiklar
const shoppingList = [];

// Nedan importerar modellen från todo.js som finns i min models-mapp
const Todo = require('./models/Todo');


//Nedan skapar en ny Todo/ alltså ny artikel (POST):
//JAG ANVÄNDER SHOPPINGITEM SOM ENDPOINTS



app.post('/shopping-list', async (req, res) => {
    try {
        const items = req.body;

        // Kontrollera om en array skickas
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Hoho! Förväntar en array av artiklar!' });
        }

        // Skapa alla artiklar
        const createdItems = await ShoppingItem.insertMany(items);

        res.status(201).json(createdItems);
    } catch (err) {
        res.status(500).json({ error: 'Oooops!, Misslyckades att skapa artiklar!' });
    }
});



//Nedan hämtar alla Todos dvs alla artiklar (GET):

app.get('/shopping-list', async (req, res) => {
    try {
      const items = await ShoppingItem.find();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: 'Aj då! Misslyckades att hämta artiklar!' });
    }
  });

//Nedan hämtar en Todo dvs hämtar en specifik artikel (GET):

app.get('/shopping-list/:id', async (req, res) => {
    try {
      const item = await ShoppingItem.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Oooops! Artikeln hittades inte!' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Urk då! Misslyckades att hämta artikeln!' });
    }
  });

// Nedan uppdatera en Todo dvs uppdatera artikel (PUT):

app.put('/shopping-list/:id', async (req, res) => {
    try {
      const item = await ShoppingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) {
        return res.status(404).json({ error: 'Synd för dig för artikeln hittades inte!' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Ack! Misslyckades att uppdatera artikeln!' });
    }
  });

// Nedan raderar en Todo dvs artikeln (DELETE):

app.delete('/shopping-list/:id', async (req, res) => {
    try {
      const item = await ShoppingItem.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Artikeln hittades inte!' });
      }
      res.status(200).json({ message: 'Ja ja, okej! Artikeln raderades då!' });
    } catch (err) {
      res.status(500).json({ error: 'Ooops! Misslyckade att radera artikeln!' });
    }
  });