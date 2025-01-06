const express = require('express');
//express ska skapa servern.

const react = require('react');

const mongoose = require('mongoose');
//mongo ska hantera databas

const bodyParser = require('body-parser');
// bodyparser ska hantera inkommande jsondata

const cors = require('cors');

const Morgan = require('morgan')

const logSymbols = require('log-symbols');

//ovanstående rader bygger REST-API med Express. Dessa hamnar sedan under package.json och dependencies. Dessa är alltså färdiga paket.


const app = express() //Denna rad skapar Express-app

const port = 3000 // Denna skapar egen kod/port för att sedan kopplas till min IP-kod. 3000 är en standardsiffra men man kan även använda annat nummer. 

app.listen(PORT, () => {
})
//här körs servern på http://localhost:3000.


app.use(cors()); //Middleware, tillåter cors. middleware ska alltid finnas i index.js. Morgan är oxå en middleware fuktion som loggar olika req, dvs när det kommer get-requests.

app.use(bodyParser.json());
//middleware, denna läser json-data i post-requests
//läser jsondata i förfrågningar




