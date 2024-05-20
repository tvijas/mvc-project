System zarządzania cyfrową biblioteką

Jak uruchomi program:
1. zainstaluj dependecies z pliku package.json za pomocy komandy - npm install
2. run Docker Descktop
3. run command: - docker compose up
4. run command: - node run app.js
   
   lub jezeli nie masz docker

1. zainstaluj dependecies z pliku package.json za pomocy komandy - npm install
2. run mysql
3. execute code in mysql from next file - ./init-sql/init.sql
4. change db connection propeties if nesseccary - ./database/config.js
5. run - node run app.js

Po uruchomieniu można przejść na następny link: http://localhost:3000/

Przy pirwszym uruchomieniu programu bedzie wyswietlony na stronie text - Error
Polecam odświerzyć stronę i wszyko będzie dzialalo

Baza danych: MySQL

Aplikacja wykorzystywuje takie technologie:

  "cookie-parser": "^1.4.6",
  "ejs": "^3.1.10",
  "express": "^4.19.1",
  "mysql2": "^3.9.7",
  "node": "^21.7.1",
  "sequelize": "^6.37.3",
  "uuid": "^9.0.1"

Aplikacja ma takie endpointy:

GET    - "/"      - zwraca glowną stronę

GET    - "/book"  - zwraca liste ksiązek

POST   - "/book"  - dodaje książkę do listy
 |
Body example:
{
"bookName":"js",
"image":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//...",
"author":"ktoś",
"description":"niema",
"genre":"programowanie",
"rating":"10"
}

PATCH  - "/book"  - edytowanie książki
 |
Body example:
{
"bookName":"js - inny",
"image":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//...",
"author":"ktoś - inny",
"description":"niema",
"genre":"programowanie",
"rating":"10",
"book_id":"18"
}

DELETE  - "/book" - usunonć książkę
 |
 Body example:
 {
 book_name : "JS",
 }
