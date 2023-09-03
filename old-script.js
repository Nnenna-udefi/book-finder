function searchBooks() {
    const searchInput = document.getElementById("book").value.trim();

    if (searchInput === "") {
        alert("Please enter a book title.");
        return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
    fetch(url).then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.items && data.items.length > 0) {
                displayResults(data.items);
            } else {
                const resultsDiv = document.getElementById("results");
                resultsDiv.innerHTML = "No books found.";
            }
        })
       .catch(error => console.error('Error fetching data: ' + error));
}

function displayResults(books) {
    const results = document.getElementById('result');
    results.innerHTML = '';

    if (books.length === 0) {
        results.innerHTML = 'No books found.';
        return;
    }

    books.forEach(book => {
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
        description = book.volumeInfo.description ? book.volumeInfo.description : "No description available";

        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
        <h2>${title}</h2>
                    <p><strong>Author:</strong> ${author}</p>
                    <p><strong>Description:</strong> ${description}</p>
                `;
        results.appendChild(bookDiv);
        console.log(results);
    });
}