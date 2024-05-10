document.getElementById('deleteBookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const bookName = formData.get('bookName');

    fetch('http://localhost:3000/book/', {
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({bookName: bookName})
    }).then(response => response.text().then(text=>{
        alert(text);
        location.reload();
    }))
});