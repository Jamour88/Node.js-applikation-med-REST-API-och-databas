# Node.js-applikation-med-REST-API-och-databas
Inlämningsuppgift - bygga egen server
Uppgiften är att bygga egen webbaserad applikation med hjälp av Node.js och Express. Applikationen ska innehålla ett REST API som hanterar CRUD-operationer (Create, Read, Update, Delete) kopplat till en databas. Vad applikationen handlar om är valfritt – det ska vara en TODO-app. Uppgiften ska versionshanteras i Git och lämnas in via en länk till ett GitHub-repo.

KRAV:

1. Node.js och Express: Applikationen ska vara byggd med Node.js och Express som backendramverk.
2. REST API : API:et ska innehålla stöd för följande HTTP-metoder:
GET – för att hämta data
POST – för att skapa data
PUT eller PATCH – för att uppdatera data
DELETE – för att radera data
3. Felhantering: Applikationen ska hantera fel på ett tydligt och användarvänligt sätt, exempelvis returnera 404 om en resurs inte hittas.
4. Databas: Applikationen ska kopplas till en databas (SQL eller NoSQL). API:et ska kunna utföra CRUD-operationer på databasen. Create, Read, Update och Delete måste alla fungera.
5. Miljövariabler: Alla känsliga uppgifter (exempelvis databaskoppling) ska hanteras via en .env-fil och läsas in med hjälp av dotenv.
6. Testning med verktyg: Applikationen ska kunna testas med verktyg som Postman eller Insomnia.

