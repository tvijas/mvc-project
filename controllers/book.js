const db = require("../dataBase/requests")
const {deleteBookByName} = require("../dataBase/requests");
const getList = (req, res) => {
    const user_token = req.cookies.userId
    try {
        const begin = req.params.begin;
        const end = req.params.end
        db.fetchBooks(begin, end, user_token)
            .then(result => {
                res.send(result)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: 'ERORR'})
            })
    } catch (error) {
        console.error('Error fetching book data:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}
const update = (res, req) => {
    const user_token = req.cookies.userId
    const {id, book_image, book_name, book_author, book_description, book_genre, book_rating} = req.body;
    try {
        db.updateBook(book_image, book_name, book_author, book_description, book_genre, book_rating, id, user_token)
            .then(result => {
                res.status(200)
            })
            .catch(error => {
                console.log(error)
                res.status(400)
            })
    } catch (error) {
        res.status(400)
    }
}
const add = (req, res) => {
    const user_token = req.cookies.userId
    const {image, bookName, author, description, genre, rating} = req.body;
    db.addBook(image, bookName, author, description, genre, rating, user_token)
        .then(result => {
            res.status(202)
        })
        .catch(error => {
            console.log(error)
            res.status(400)
        })
    res.json({message: 'Book added successfully'});
}
const deleteBook = (req, res) => {
    const book_name = req.body.bookName;
    db.deleteBookByName(book_name)
        .then(result => {
            if (result.affectedRows > 0) {
                res.json({message: 'Book deleted successfully'});
                res.status(202);
            } else {
                res.json({message: 'Book not found'});
                res.status(404);
            }
        })
        .catch(error => {
            res.json({message: 'Error occurred'});
            res.status(400);
        });
}
module.exports = {
    getList: getList,
    update: update,
    add: add,
    deleteBook: deleteBook
}