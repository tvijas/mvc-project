document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const imageFile = formData.get('image');
    const fileReader = new FileReader();
    fileReader.onload = function(event) {

        const body = {
            book_image: event.target.result,
            book_name: formData.get('bookName'),
            book_author: formData.get('author'),
            book_description: formData.get('description'),
            book_genre: formData.get('genre'),
            book_rating: formData.get('rating'),
        };
        fetch('http://localhost:3000/book/', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.text().then(text=>{
            alert(text);
            location.reload();
        }))
    };

    fileReader.readAsDataURL(imageFile);
});