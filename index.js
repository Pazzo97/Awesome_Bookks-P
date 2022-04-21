const listItem = document.querySelector('.list-link');
const addItem = document.querySelector('.add-link');
const contactItem = document.querySelector('.contact-link');
const formItems = document.querySelector('.new-book');
const bookList = document.querySelector('#book-list');
const contSec = document.querySelector('.contact');

listItem.addEventListener('click', () => {
  formItems.style.display = 'none';
  contSec.style.display = 'none';
  bookList.style.display = 'block';
});

addItem.addEventListener('click', () => {
  formItems.style.display = 'block';
  contSec.style.display = 'none';
  bookList.style.display = 'none';
});

contactItem.addEventListener('click', () => {
  formItems.style.display = 'none';
  contSec.style.display = 'block';
  bookList.style.display = 'none';
});

const currentTime = new Date();
document.querySelector('.time').innerHTML = currentTime;

// Create a class
class Book {
  // Book a container
  shelf;

  // An empty array of books
  books = [];

  //  Align books added to shelf
  constructor(bookShelf) {
    this.shelf = document.querySelector(bookShelf);
    const data = localStorage.getItem('books');
    this.books = data ? JSON.parse(data) : [];
    this.incrementBooks(this.books);
    this.addRemoveEventListener();
  }

  //  Method that adds books to the shelf
  addBookToSHelf(bookDetailObject) {
    this.books = [...this.books, { id: this.books.length + 1, ...bookDetailObject }];
    this.incrementBooks(this.books);
    this.addRemoveEventListener();
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  //  Method that increments the books in shelf(+1 whenever)
  incrementBooks(books) {
    this.shelf.innerHTML = books.map((book) => `<div class="book-block">
    
    <div class="title-author">

        <div class="title">${book.title}</div>
        <div> <p>by</p> </div>
        <div>${book.author}</div>

    </div>

    <div class="buttons">
      <button data-id="${book.id}" class="remove">Remove</button>
    </div>
</div>`).join('');
  }

  addRemoveEventListener() {
    const deleteBtn = document.querySelectorAll('.remove');
    deleteBtn.forEach((el) => {
      el.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        this.removeBookFromShelf(id);
      });
    });
  }

  //  Method that removes books from the shelf
  removeBookFromShelf(id) {
    this.books = this.books.filter((b) => b.id !== Number(id));
    this.incrementBooks(this.books);
    this.addRemoveEventListener();
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

// initialize obeject for class Book
const todo = new Book('#book-list');

// Event listener for Adding books on Add button
const addBook = document.querySelector('#add-book');
addBook.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the values from the form
  const title = event.target.querySelector('#title').value;
  const author = event.target.querySelector('#author').value;
  todo.addBookToSHelf({ title, author });
  // Remove inputs from the form after adding the book
  event.target.querySelector('#title').value = '';
  event.target.querySelector('#author').value = '';
});