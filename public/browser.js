// Making the Create feature asynchronous like the others
let formEl = document.getElementById("create-form");
let titleField = document.getElementById('create-title');
let authorField = document.getElementById('create-author');
let bookField = document.getElementById('book-list');

function bookTemplate(book) {
    return `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text"><b>Book title:</b> ${book.title} <br> <b>Author:</b> ${book.author}</span>
        <div>
            <button data-id="${book._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${book._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
    </li>
    `;
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/create-item', { title: titleField.value, author: authorField.value }).then((response) => {
        // Create HTML for a new book
        bookField.insertAdjacentHTML("beforeend", bookTemplate(response.data));
        titleField.value = "";
        titleField.focus();
        authorField.value = "";
        authorField.focus();
    }).catch(() => {
        console.log("please try again later")
    })
})


// Event Listeners
document.addEventListener('click', (e) => {
    // Delete button functionality
    if (e.target.classList.contains('delete-me')) {
        if (confirm("Do you really want to delete this book?")) {
            axios.post('/delete-item', { id: e.target.getAttribute('data-id') }).then(() => {
                e.target.parentElement.parentElement;
            }).catch(() => {
                console.log("please try again later")
            })
        }
    }


    // Edit button functionality
    if (e.target.classList.contains('edit-me')) {
        let userTitleInput = prompt("Enter your desired new title", "Book Title");
        let userAuthorInput = prompt("Enter your desired new author name", "Author Name");
        if (userTitleInput) {
            axios.post('/update-item', { title: userTitleInput, author: userAuthorInput, id: e.target.getAttribute('data-id') }).then(() => {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = `<b>Book title:</b> ${userTitleInput} <br> <b>Author:</b> ${userAuthorInput}`;
            }).catch(() => {
                console.log("please try again later")
            })
        }
    }
});

//