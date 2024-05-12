function handleEditButtonClick(event) {
    const bookDiv = event.target.closest('div');
    let image = bookDiv.querySelector('img:first-child').src;
    let bookId = bookDiv.querySelector("p:first-child").textContent;
    let bookName = bookDiv.querySelector(".book_name").innerText;
    let author = bookDiv.querySelector(".book_author").innerText;
    let genre = bookDiv.querySelector(".book_genre").innerText;
    let rating = bookDiv.querySelector(".book_rating").innerText;
    let description = bookDiv.querySelector(".descriptionButton").title;
4
    let edit_image_preview = document.getElementById("edit_image_preview")
    let edit_bookId = document.getElementById("edit_bookId");
    let edit_bookName = document.getElementById('edit_bookName');
    let edit_author = document.getElementById('edit_author');
    let edit_description = document.getElementById('edit_description');
    let edit_genre = document.getElementById('edit_genre');
    let edit_rating = document.getElementById('edit_rating');

    edit_image_preview.src = image;
    edit_bookId.textContent = bookId;
    edit_bookName.value = bookName;
    edit_author.value = author;
    edit_description.value = description;
    edit_genre.value = genre;
    edit_rating.value = rating;

}