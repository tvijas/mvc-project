System zarządzania cyfrową biblioteką

Jak uruchomi program: Pobra

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
