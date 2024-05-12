const db = require("../dataBase/requests");
const Book = require("../models/Book");
const update =  (req, res) => {
    const user_token = req.cookies.userId;
    const book_id = req.body.book_id;
    const book = new Book(req);

    db.updateBook(book_id, book, user_token).then(() => {
        res.status(200).send("Book updated successfully");
    }).catch(error => {
        console.log(error);
        res.status(400).send("Incorrect or empty fields");
    })
}
const add = (req, res) => {
    const user_token = req.cookies.userId;
    const book = new Book(req);
    console.log(book)

    db.createBook(book,user_token).then(() => {
        res.status(200).send("Book created successfully");
    }).catch(error => {
        console.log(error)
        res.status(400).send("Incorrect or empty fields")
    })
}
const deleteBook = (req, res) => {
    const user_token = req.cookies.userId;
    const book_name = req.body.bookName;

    db.deleteBook(book_name, user_token).then(() => {
        res.status(200).send("Book deleted successfully");
    }).catch(error => {
        console.log(error);
        res.status(400).send("Incorrect book name or empty field");
    });
}
module.exports = {
    update: update,
    add: add,
    deleteBook: deleteBook
}