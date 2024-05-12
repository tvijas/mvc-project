const UserEntity = require("./UserEntity");
const BookEntity = require("./BookEntity");

async function createBook(book, user_token) {
    return new Promise((resolve, reject) => {
        UserEntity.findOne({where: {user_token: user_token}}).then(userEntity => {
            book.user_id = userEntity.id;
            BookEntity.create(book).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}

async function getBooks(user_token) {
    return new Promise((resolve, reject) => {
        UserEntity.findOne({where: {user_token: user_token}}).then(userEntity => {
            BookEntity.findAll({where: {user_id: userEntity.id}})
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

async function updateBook(book_id, book, user_token) {
    return new Promise((resolve, reject) => {
        UserEntity.findOne({where: {user_token: user_token}}).then(userEntity => {
            BookEntity.findOne({where: {id: book_id, user_id: userEntity.id}}).then(bookEntity => {
                bookEntity.update(book).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}

async function deleteBook(book_name, user_token) {
    const user = await UserEntity.findOne({where: {user_token: user_token}});
    return new Promise((resolve, reject) => {
        BookEntity.findOne({
            where: {book_name: book_name, user_id: user.id}, attributes: ['id', 'book_name', 'user_id']
        }).then(data => {
            data.destroy();
            resolve(data);
            console.log('Book was deleted successfully');
        }).catch(error => {
            console.log('Error occurred');
            reject(error);
        });
    })

}

async function createUser(user_token) {
    return new Promise((resolve, reject) => {
        UserEntity.create({user_token: user_token})
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

module.exports = {
    createBook: createBook,
    getBooks: getBooks,
    updateBook: updateBook,
    deleteBook: deleteBook,
    createUser: createUser
};

