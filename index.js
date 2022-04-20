const bookList = document.querySelector('.books');
const form = document.getElementById('add-book');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

let books = [];

class BookClass {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  bookCode() {
    return `<div class="book-block">
    
                <div class="title-author">

                    <div class="title">${this.title}</div>
                    <div> <p>by</p> </div>
                    <div>${this.author}</div>

                </div>

                <div class="buttons">
                  <button data-id=${this.id} class="remove">Remove</button>
                </div>
            </div>`;
  }

  static addBook(book) {
    let id = 1;
    if (books.length > 0) {
      id = books[books.length - 1].id + 1;
    }
    book.id = id;
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static remove(id) {
    books = books.filter((b) => b.id !== Number(id));
    localStorage.setItem('books', JSON.stringify(books));
  }
}
const storeBooks = JSON.parse(localStorage.getItem('books'));

function showBooks() {
  const booksCode = books.map((book) => new BookClass(book.title, book.author, book.id).bookCode());
  bookList.innerHTML = booksCode.join('');
  const deleteBtn = document.querySelectorAll('.remove');
  deleteBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      BookClass.remove(id);
      showBooks();
    });
  });
}

if (storeBooks) {
  books = storeBooks;
  showBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }
  const newBook = new BookClass(title, author);
  BookClass.addBook(newBook);
  showBooks();
  titleInput.value = '';
  authorInput.value = '';
});
