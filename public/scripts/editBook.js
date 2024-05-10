document.getElementById('editBookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const edit_bookId = document.getElementById('edit_bookId').textContent;
    const formData = new FormData(this);
    formData.append('book_id', edit_bookId);

    const imageFile = formData.get('image');
    if (!imageFile) {
        console.error('Please select an image');
        return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const body = {
            book_image: event.target.result,
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
        }).then(response => response.text().then(text=>{
            alert(text);
            location.reload();
        }))
    };

    fileReader.onerror = function (error) {
        console.error('Error reading the file:', error);
    };

    fileReader.readAsDataURL(imageFile);
});
