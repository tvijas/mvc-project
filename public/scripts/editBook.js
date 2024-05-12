document.getElementById('editBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const edit_bookId = document.getElementById('edit_bookId').textContent;
    const formData = new FormData(this);
    formData.append('book_id', edit_bookId);

    let imageFile = formData.get('image');

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        imageFile = event.target.result;
        if (imageFile.endsWith(',')) {
            imageFile = document.getElementById("edit_image_preview").src
        }

        const body = {
            book_image: imageFile,
            book_name: formData.get('bookName'),
            book_author: formData.get('author'),
            book_description: formData.get('description'),
            book_genre: formData.get('genre'),
            book_rating: formData.get('rating'),
            book_id: edit_bookId
        };
        fetch('http://localhost:3000/book/', {
            credentials: 'same-origin',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.text().then(text => {
            alert(text);
            location.reload();
        }))
    };

    fileReader.onerror = function (error) {
        console.error('Error reading the file:', error);
    };

    fileReader.readAsDataURL(imageFile);
});
