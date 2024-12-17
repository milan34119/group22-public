# Project description


### Casper Adriaensen Langouche / \<Student 2 name\>
# Project requirements
1) ~~De code van je project staat op GitHub classroom, in een repository die overeenkomt met je Toledo groep.~~
2) ~~De map “back-end/model” bevat je domeinmodel geschreven in Typescript.~~
3) **De map “back-end/test/model” bevat alle tests voor je domeinobjecten.** 
4) **Tests worden geschreven met Jest.**
5) ~~Alle lagen worden geïmplementeerd volgens de principes van gelaagde architectuur~~
6) Validatie:
	- **Controllers bevatten geen validatie.**
    - **Services bevatten overkoepelende validatieregels.**
    - **Domeinobjecten bevatten input validatie en business validatie die specifiek zijn voor dat domeinobject.**
7) Testen:
    - **Alle domeinobjecten zijn volledig getest met Jest, inclusief validatie.**
    - **Alle services zijn volledig getest met Jest.**
    - **Controllers worden getest via swagger (handmatig), geen aparte tests nodig**.
8) ~~De gegevens die binnenkomen via requests in de router worden ingekapseld in Data Transfer Objects. Deze DTO's zijn gedefinieerd in een bestand index.ts in de map types.~~
9) **Alle routes zijn volledig gedocumenteerd en uitvoerbaar met Swagger via de url /api-docs.**
10) **Voor elk type is er een volledig uitgewerkt componentenschema gedefinieerd bovenaan de controller zelf.**
11) ~~Een Next.js front-end app is geïnstalleerd in de front-end directory.~~
12) ~~Alle pagina's die een route in Next.js nodig hebben worden in de map “pages” geplaatst.~~
13) **Pagina's worden opgebouwd uit verschillende herbruikbare componenten die in de map “components” worden geplaatst.**
14) **Componenten worden niet rechtstreeks geïmplementeerd in een pagina.**
15) **“Props” worden gebruikt om dynamische inhoud binnen componenten weer te geven.**
16) **“State” wordt gebruikt om informatie op te slaan tussen verschillende renders van een component (geen lokale variabelen!).**
17) **Callback functies worden gebruikt om hogerliggende componenten of pagina's op de hoogte te brengen van een gebeurtenis binnen de huidige component.**
18) ~~Het aanroepen van een Rest API gebeurt in afzonderlijke, herbruikbare Services. Er wordt nooit fetch logica rechtstreeks in een component geschreven.~~
19) **Dynamische routing moet op de juiste plaatsen worden gebruikt.**
20) **Je gebruikt events op verschillende plaatsen (onclick, onhover, ...).**
21) **Wijzigingen aan bestaande entiteiten moeten in de servicelaag via het domeinmodel worden gedaan en pas daarna via de repository-laag naar de database worden gestuurd. Op deze manier worden business- en validatieregels niet geschonden.**
22) ~~Het databaseschema wordt gemodelleerd in een Prisma-schema en de Prisma-client wordt gegenereerd.~~
23) ~~Databaseobjecten in de domeinlaag gebruiken de Prisma-client om de database te bevragen.~~
24) ~~Er worden geen Prisma-objecten doorgegeven aan de servicelaag. Prisma-objecten worden gekoppeld aan domeinobjecten in een statische from-methode van het bijbehorende domeinobject.~~
25) ~~Er wordt een lokale postgreSQL database geïnstalleerd en gebruikt. De configuratie om verbinding te maken staat in een .env bestand.~~
26) ~~Er wordt minimaal 1 één-op-veel relatie gemodelleerd.~~
27)  ~~Tenminste 1 many-to-many relatie is gemodelleerd in je prisma schema en domein objecten. Er mag geen circulaire afhankelijkheid bestaan in je domeinlaag, dus beslis of je een tussenliggend object gebruikt of dat je de relatie in het domein uni-directioneel maakt.~~
28) **De hook useSWR wordt gebruikt voor API-requests.**
29) **SSR en SSG kunnen optioneel worden toegepast.**
30) **De hook useEffect wordt gebruikt voor interactie met een extern systeem (bijv. browser storage).**
31) **Er is minstens 1 functioneel formulier met validatie, foutafhandeling en integratie met de back-end.**
32) **Er is minstens 1 login formulier met validatie en foutafhandeling.**
33) ~~Er worden minstens 2 waarden opgeslagen in de browser storage en gebruikt in de hele applicatie.~~
34) ~~Styling is toegepast in de mate dat je applicatie bruikbaar en leesbaar is. Je mag je eigen styling framework kiezen.~~
35) User Sign-up:
	- ~~Paswoorden worden steeds encrypted opgeslagen in de database (bcrypt).~~
    - **User input wordt steeds gevalideerd. (Back-end en Front-end)**
36) Authentication:
    - **Je gebruikt JWT token based authentication waar nodig in de routes en Swagger.** 
    - **Behalve voor login, register, status, de Swagger documentatie en eventueel een beperkt aantal andere routes afhankelijk van de context van je project.**
37) Authorisation:
	- **Je hebt minstens 3 verschillende rollen in je domain.**
	- **Minstens 1 route in je back-end heeft een ander gedrag afhankelijk van de rol (geeft andere data op basis van de rol)**
38) ~~Je kan inloggen, uitloggen en gebruikers registreren.~~
39) ~~Er wordt gebruik gemaakt van token-based authentication met JWT.~~
40) ~~Authentication: de meeste pagina's zijn afgeschermd~~
41) ~~Authorisation: minstens 1 pagina geeft een andere content op basis van de rol~~
42) ~~Als gebruiker een functionaliteit/pagina oproept waartoe hij niet gemachtigd is, wordt hij op een correcte manier geïnformeerd.~~
43) **Je voorziet op de homepagina een tabel met een aantal voorgedefinieerde gebruikers die wij als lectoren kunnen gebruiken om je project mee te testen**
44) **Indien de username of het password niet voldoet aan je validatieregels dan verander je dat in de tabel.**
45) **Je kan minstens 3 pagina's van je project in minstens 2 talen/locales tonen.**
46) **Je kan op een gebruiksvriendelijke manier de taal switchen op elk van minstens deze 3 pagina's**
