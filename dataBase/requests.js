const db = require("../dataBase/config");

function fetchBooks(begin, end, user_token) {
    const sql = 'SELECT * FROM books WHERE user_id = (SELECT id FROM users WHERE user_token = ?) LIMIT ?, ?';
    const values = [user_token, Number(begin), Number(end)];

    return new Promise((resolve, reject) => {
        db.connection.query(sql, values, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function addBook(bookImage, bookName, author, description, genre, rating, user_token) {
    const sql = 'INSERT INTO books (book_image,book_name, book_author, book_description, book_genre, book_rating, user_id) VALUES (?,?, ?, ?,?, ?, (SELECT id FROM users WHERE user_token = ?))'
    const values = [bookImage, bookName, author, description, genre, Number(rating), user_token];

    return new Promise((resolve, reject) => {
        db.connection.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

function addUser(user_token) {
    const sql = 'INSERT INTO users (user_token) VALUES (?)';
    const values = [user_token]
    return new Promise((resolve, reject) => {
        db.connection.query(sql, values, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function updateBook(bookImage, bookName, bookAuthor, bookDescription, bookGenre, bookRating, bookId, user_token) {
    const sql = `UPDATE books 
             SET book_image = ?, book_name = ?, book_author = ?, book_description = ?, book_genre = ?, book_rating = ? 
             WHERE id = ? AND user_id = (SELECT id FROM users WHERE user_token = ?)`;

    const values = [bookImage, bookName, bookAuthor, bookDescription, bookGenre, bookRating, bookId, user_token];

    return new Promise((resolve, reject) => {
        db.connection.query(sql, values, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                console.log('Book updated successfully');
            }
        });
    });
}

function deleteBookByName(book_name) {
    const value = String(book_name);
    const sql = `DELETE FROM books WHERE book_name = ?;`;
    return new Promise((resolve, reject) => {
            db.connection.query(sql, value, function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
}


module.exports = {
    fetchBooks: fetchBooks,
    addBook: addBook,
    addUser: addUser,
    updateBook: updateBook,
    deleteBookByName: deleteBookByName
};