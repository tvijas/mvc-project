const Sequelize = require('sequelize');
const {DataTypes} = require("sequelize");
const sequelize = new Sequelize('library', 'root', 'password', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
sequelize.authenticate().then(() => {
    console.log("Connection established successful")
}).catch(() => {
    console.log("Error occurred")
});

const Database = sequelize.define('books', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    book_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    book_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    book_author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    book_description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    book_genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    book_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
        }
    }
}, {timestamps: false, validate: true});

const UserEntity = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    user_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {timestamps: false, validate: true});

async function createBook(book, user_token) {
    return new Promise((resolve, reject) => {
        UserEntity.findOne({where: {user_token: user_token}}).then(userEntity => {
            Database.create({
                book_image: book.book_image,
                book_name: book.book_name,
                book_author: book.book_author,
                book_description: book.book_description,
                book_genre: book.book_genre,
                book_rating: book.book_rating,
                user_id: userEntity.id
            }).then(data => {
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
            Database.findAll({where: {user_id: userEntity.id}})
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
            Database.findOne({where: {id: book_id, user_id: userEntity.id}}).then(bookEntity => {
                bookEntity.update({
                    book_image: book.book_image,
                    book_name: book.book_name,
                    book_author: book.book_author,
                    book_description: book.book_description,
                    book_genre: book.book_genre,
                    book_rating: book.book_rating,
                }).then(data => {
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
        Database.findOne({
            where: {book_name: book_name, user_id: user.id}, attributes: ['id', 'book_name', 'user_id']
        }).then(data => {
            data.destroy();
            resolve(data);
            console.log('Database was deleted successfully');
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
