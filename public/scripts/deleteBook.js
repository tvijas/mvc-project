document.getElementById('deleteBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(this);
    const bookName= formData.get('bookName');

        // Make POST request to add the book
        fetch('http://localhost:3000/book/', {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookName: bookName })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Book deleted successfully:', data);
                location.reload();
                // Optionally, you can redirect or show a success message here
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    });