class Book{
    book_image;
    book_name ;
    book_author;
    book_description;
    book_genre;
    book_rating;
    constructor (req) {
        this.book_image = req.body.book_image;
        this.book_name = req.body.book_name;
        this.book_author = req.body.book_author;
        this.book_description = req.body.book_description;
        this.book_genre = req.body.book_genre;
        this.book_rating = Number(req.body.book_rating);

    }

    get book_image() {
        return this.book_image;
    }

    set book_image(value) {
        this.book_image = value;
    }

    get book_name() {
        return this.book_name;
    }

    set book_name(value) {
        this.book_name = value;
    }

    get book_author() {
        return this.book_author;
    }

    set book_author(value) {
        this.book_author = value;
    }

    get book_description() {
        return this.book_description;
    }

    set book_description(value) {
        this.book_description = value;
    }

    get book_genre() {
        return this.book_genre;
    }

    set book_genre(value) {
        this.book_genre = value;
    }

    get book_rating() {
        return this.book_rating;
    }

    set book_rating(value) {
        this.book_rating = value;
    }
}
module.exports = Book;