# chat-app



### Chappy - Chat-app med API

## Chappy är en chat-app med ett API som möjliggör kommunikation och autentisering mellan användare. Detta projekt använder tekniker som Express, Lowdb, JWT-autentisering och REST-API för att implementera grundläggande funktionalitet för meddelanden, användare, autentisering och kanaler.

### Projektöversikt

## Målet med detta projekt är att skapa en chat-app där användare kan skicka meddelanden till öppna och låsta kanaler efter att de har loggat in. Appen kommer även att stödja direktmeddelanden (DM) mellan användare. Projektet består av både en frontend-mockup och ett API för att hantera data och autentisering.

### Teknisk arkitektur

## Express: Används för att bygga API:et och hantera HTTP-förfrågningar och svar.
## Lowdb: En enkel JSON-baserad databas används för att spara data.
## JSON Web Tokens (JWT): Autentisering implementeras med JWT för inloggning och säker resurshantering.
## REST-API: API:et följer principerna för RESTful API-arkitektur för att underlätta kommunikation mellan klient och server.
## API-design och funktioner
## Autentisering: Inloggningsendpoint ("/api/users/login") som tar emot användarnamn och lösenord och genererar en JWT-token vid lyckad autentisering. Autentiserade användare kan sedan använda token för att auktorisera efterföljande förfrågningar.
## Kanalhantering: API:et stödjer skapande av nya kanaler, hämtning av alla kanaler och hämtning av specifika kanaler. Endast inloggade användare kan se låsta kanaler och skicka meddelanden till dem.
## Meddelandehantering: Användare kan skicka meddelanden till både öppna och låsta kanaler. Direktmeddelanden (DM) kan också skickas mellan användare och är endast synliga för avsändaren och mottagaren.
## Säkerhet och datalagring
## Lösenordslagring: Användarnas lösenord sparas krypterade i databasen. En hash-funktion används för att kryptera lösenorden och verifiera dem vid inloggning.
## JWT-autentisering: Genom att använda JWT-token säkerställs att endast autentiserade användare har åtkomst till vissa funktioner och resurser.


### Publicering och testning

## Projektet har publicerats online genom användning av surge.sh, en molnbaserad plattform. Detta gör det möjligt för andra att använda appen via det offentliga API:et.

## Insomnia används för att testa funktionalitet och säkerhet i API:et.


