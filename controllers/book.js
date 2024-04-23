const db = require("../dataBase/requests")
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
module.exports = {
    getList:getList,
    update:update,
    add:add
}