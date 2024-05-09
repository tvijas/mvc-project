document.getElementById('editBookForm').addEventListener('submit', function(event) {
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
    fileReader.onload = function(event) {
        const body = {
            image: event.target.result,
            bookName: formData.get('bookName'),
            author: formData.get('author'),
            description: formData.get('description'),
            genre: formData.get('genre'),
            rating: formData.get('rating'),
            book_id: edit_bookId
        };

        fetch('http://localhost:3000/book/', {
            credentials: 'same-origin',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Book updated successfully:', data);
                location.reload();
                // Optionally, you can redirect or show a success message here
            })
            .catch(error => {
                console.error('Error updating book:', error);
                // Optionally, you can show an error message here
            });
    };

    fileReader.onerror = function(error) {
        console.error('Error reading the file:', error);
    };

    // Read the selected image file
    fileReader.readAsDataURL(imageFile);
});
