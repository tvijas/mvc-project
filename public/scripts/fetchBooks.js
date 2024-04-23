fetch('http://localhost:3000/books/getList/0/10', {
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
            // Create elements to display book information
            const bookDiv = document.createElement('div');

            bookDiv.innerHTML = `
            <p style="display: none">${jsonData[i].id}</p>
            <span class="book_image"><img src="${jsonData[i].book_image}" alt="Book Image"></span>
            <p><span class="book_name">${jsonData[i].book_name}</span></p>
            <p><span class="book_author">${jsonData[i].book_author}</span></p>
            <p><span class="book_description">${jsonData[i].book_description}</span></p>
            <p>Genre: <span class="book_genre">${jsonData[i].book_genre}</span></p>
            <p>Rating: <span class="book_rating">${jsonData[i].book_rating}</span></p>
            <button class="editButton">Edit</button>
            <button class="saveButton" style="display: none">Save</button>
            <hr>
            `;

            // Append the book information to the books container
            booksContainer.appendChild(bookDiv);

            // Назначение обработчиков событий после создания кнопок
            const editButton = bookDiv.querySelector('.editButton');
            const saveButton = bookDiv.querySelector('.saveButton');

            editButton.addEventListener('click', handleEditButtonClick);
            saveButton.addEventListener('click', handleSaveButtonClick);
        }
    })
    .catch(error => {
        console.error('Error fetching book data:', error);
    });

// Обработчик нажатия на кнопку Edit
function handleEditButtonClick(event) {
    const bookDiv = event.target.closest('div');
    const editButton = bookDiv.querySelector('.editButton');
    const saveButton = bookDiv.querySelector('.saveButton');
    const fields = bookDiv.querySelectorAll('span');

    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';

    fields.forEach(field => {
        const input = document.createElement('input');
        switch (field.classList[0]) {
            case 'book_image':
                const img = document.createElement('img');
                img.src = field.querySelector('img').src; // Сохраняем ссылку на изображение
                const imageContainer = document.createElement('span');
                const inputFile = document.createElement('input')
                inputFile.type = 'file';
                inputFile.id = 'image';
                imageContainer.appendChild(img);
                field.appendChild(document.createElement('br'));
                imageContainer.appendChild(inputFile)
                field.replaceWith(imageContainer);
                break;
            case 'book_name':
                input.type = 'text';
                input.id = 'bookName';
                input.value = field.textContent;
                break;
            case 'book_author':
                input.type = 'text';
                input.id = 'author';
                input.value = field.textContent;
                break;
            case 'book_description':
                input.type = 'textarea';
                input.id = 'description';
                input.value = field.textContent;
                break;
            case 'book_genre':
                input.type = 'text';
                input.id = 'genre';
                input.value = field.textContent;
                break;
            case 'book_rating':
                input.type = 'number';
                input.min = '1';
                input.max = '10';
                input.step = '0';
                input.id = 'rating';
                input.value = field.textContent;
                break;
            default:
                break;
        }
        field.textContent = '';
        field.appendChild(document.createElement('br'));
        field.appendChild(input);
    })
}

// Обработчик нажатия на кнопку Save
function handleSaveButtonClick(event) {
    const bookDiv = event.target.closest('div');
    const editButton = bookDiv.querySelector('.editButton');
    const saveButton = bookDiv.querySelector('.saveButton');
    const fields = bookDiv.querySelectorAll('span');

    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';

    const data = {
        id: bookDiv.querySelector('p:first-child').textContent,
        book_image: fields[0].querySelector('img').src,
        book_name: fields[1].querySelector('input').value,
        book_author: fields[2].querySelector('input').value,
        book_description: fields[3].querySelector('input').value,
        book_genre: fields[4].querySelector('input').value,
        book_rating: fields[5].querySelector('input').value
    };
    console.log(data)
    sendData(data);
    location.reload()

    function sendData(data) {
        // Отправка данных на сервер
        fetch('http://localhost:3000/books/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data sent successfully');
                    // Здесь вы можете обновить данные, если сервер что-то вернет
                } else {
                    console.error('Failed to send data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Обновление отображения
    fields.forEach(field => {
        const value = field.querySelector('input').value;
        field.textContent = value;
    });

}