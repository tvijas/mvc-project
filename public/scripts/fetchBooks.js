fetch('http://localhost:3000/book/0/10', {
    method : 'GET',
    credentials: 'same-origin',
}) // Assuming this endpoint returns an array of books
    .then(response => {
        return response.json();
    })
    .then(data => {
        const jsonString = JSON.stringify(data, null, 2)
        const jsonData = JSON.parse(jsonString)
        const booksContainer = document.getElementById('books');

        for (let i = 0; i < 10; i++) {
            const bookDiv = document.createElement('div');
            bookDiv.setAttribute("class","book_container")
            //<p><span className="book_description">${jsonData[i].book_description}</span></p>
            bookDiv.innerHTML = `
            <p class="book_id" style="display: none">${jsonData[i].id}</p>
            <span class="book_image"><img src="${jsonData[i].book_image}" alt="No image"></span>
            <p><span class="book_name">${jsonData[i].book_name}</span></p>
            <p><span class="book_author">${jsonData[i].book_author}</span></p>
            <p>Genre: <span class="book_genre">${jsonData[i].book_genre}</span></p>
            <p>Rating: <span class="book_rating">${jsonData[i].book_rating}</span></p>
            <button class="editButton">Edit</button>
            <button class="saveButton" style="display: none">Save</button>
            <button class="descriptionButton" title="${jsonData[i].book_description}">?</button>
            <hr>
            `;
            booksContainer.appendChild(bookDiv);

            const editButton = bookDiv.querySelector('.editButton');
            editButton.addEventListener('click', handleEditButtonClick);
        }
    })
    .catch(error => {
        console.error('Error fetching book data:', error);
    });

// Обработчик нажатия на кнопку Edit
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