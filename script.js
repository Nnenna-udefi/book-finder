$(document).ready(function(){
    $('#form').submit(function(event){
        event.preventDefault(); // Prevent the form from submitting and page reloading
        const search = $('#book').val(); 

        if(search === '') {
            alert('Please enter the book title or author name');
            return;
        }
        else {
            const apiKey = 'AIzaSyDPALRZM5_D_GiOH68WzQkio7lrKMqm_M0'
            const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${apiKey}`;

            $.get(url, function(response){

                $('#result').empty(); // Clear previous results

                if (response.items) {
                    response.items.forEach(function(book) {
                        const title = $('<h2>').text(book.volumeInfo.title);
                        const author = $('<h3>').text(book.volumeInfo.authors
                            ? book.volumeInfo.authors.join(', ') : 'Unknown Author');
                        const img = $('<img>');
                        // Check if 'thumbnail' property exists before setting the 'src'
                        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                            img.attr('src', book.volumeInfo.imageLinks.thumbnail)
                            .attr('alt', book.volumeInfo.title);
                        } else {
                            img.attr('src', 'placeholder_image_url.jpg');
                            img.addClass('placeholder-image');
                        };

                        const description = book.volumeInfo.description || '';
                        const maxLength = 250;
                        const truncatedDescription = description.length > maxLength
                            ? description.substring(0, maxLength) + '...' : description;

                        const readMoreLink = $('<a>').attr('href', book.volumeInfo.infoLink).text('Read More');
                        const readMoreButton = $('<button>').append(readMoreLink).addClass('readmore-btn');
                        const descriptionText = $('<p>').text(truncatedDescription);
                        const card = $('<div>').addClass('card')
                        card.append(title, author, img, descriptionText, readMoreButton);
                        

                        $('#result').append(card);
                    });
                } else {
                    $('#result').text('No books found.');
                }
                    console.log(response);
                });
        }
    });
})