// Book library array
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// Toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Add book to library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Display books on page
function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';
    
    if (myLibrary.length === 0) {
        bookGrid.innerHTML = `
            <div class="empty-state">
                <h2>No books yet!</h2>
                <p>Click "Add New Book" to start building your library</p>
            </div>
        `;
        return;
    }
    
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p class="pages"><strong>Pages:</strong> ${book.pages}</p>
            <span class="read-status ${book.read ? 'read' : 'not-read'}">
                ${book.read ? '✓ Read' : '○ Not Read'}
            </span>
            <div class="book-card-buttons">
                <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">
                    ${book.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
            </div>
        `;
        
        bookGrid.appendChild(bookCard);
    });
}

// Toggle read status
function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Remove book from library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}
// Dialog and form handling
const dialog = document.getElementById('bookDialog');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

// Open dialog
addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

// Close dialog
cancelBtn.addEventListener('click', () => {
    dialog.close();
    bookForm.reset();
});

// Close dialog when clicking outside
dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
        bookForm.reset();
    }
});

// Handle form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    
    dialog.close();
   bookForm.reset();
});

// Add some sample books for demonstration
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 324, false);
addBookToLibrary('1984', 'George Orwell', 328, true);

// Initial display
displayBooks();

