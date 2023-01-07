const popupBtn = document.querySelector('.popup-btn');
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const popup = document.querySelector('.popup');
const books = document.querySelector('.books');
const overlay = document.querySelector('.overlay');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    [this.titleInput, this.authorInput, this.pagesInput, this.completedPagesInput] = [...document.querySelectorAll('input')];
  }

  addBookToLibrary = () => {
    let read;
    if (form.validateInputs() === false) return;
    if (this.pagesInput.value === this.completedPagesInput.value) {
      read = 'Yes';
    } else {
      read = 'No';
    }
    const book = new Book(this.titleInput.value, this.authorInput.value, this.pagesInput.value, read);
    myLibrary.push(book);
    bookHtml();
    stats.addBookToStats(book);

    overlay.style.display = 'none';
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = 'none';
    }, 1000);
  };

  removeBookFromLibrary = (e) => {
    books.removeChild(e.target.parentElement.parentElement);
    myLibrary.forEach((element) => {
      if (element.title === e.target.parentElement.parentElement.children[1].children[0].textContent) {
        myLibrary.splice(myLibrary.indexOf(element), 1);
      }
    });
  };
}

class Form {
  constructor() {
    this.inputs = document.querySelectorAll('input');
    this.message = document.querySelector('.message');
  }

  validateInputs() {
    let firstval = true;
    let secondval = true;
    if ([...this.inputs].some((child) => !child.value)) {
      this.message.textContent = 'Please fill in all fields';
      firstval = false;
    } else if (+this.inputs[2].value < +this.inputs[3].value) {
      this.message.textContent = "Read pages can't be larger than total pages";
      secondval = false;
    }
    if (firstval === true && secondval === true) {
      return true;
    }
    return false;
  };

  displayForm() {
    overlay.style.display = 'block';
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 100);
  };

  hideForm() {
    overlay.style.display = 'none';
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.display = 'none';
    }, 1000);
  };
}

class Information {
  constructor() {
    this.completedPageStats = document.querySelector('.completed-stats');
    this.completedBookStats = document.querySelector('.completed-book-stats');
    this.totalPageStats = document.querySelector('.total-page-stats');
    this.bookStats = document.querySelector('.books-stats');
  }
    removeBookFromStats(e) {
      this.bookStats.textContent--;
      this.totalPageStats.textContent = +this.totalPageStats.textContent - +e.target.parentElement.parentElement.children[3].children[0].textContent;
      this.completedPageStats.textContent = +this.completedPageStats.textContent - +e.target.parentElement.parentElement.children[3].children[1].textContent;
      if (+e.target.parentElement.parentElement.children[3].children[1].textContent === +e.target.parentElement.parentElement.children[3].children[0].textContent) {
        this.completedBookStats.textContent--;
      }
    };

    addBookToStats(book) {
      this.bookStats.textContent++;
      this.totalPageStats.textContent = parseInt(this.totalPageStats.textContent) + parseInt(library.pagesInput.value);
      if (book.read === 'Yes') {
        this.completedBookStats.textContent++;
        document.querySelectorAll('.completed')[myLibrary.length - 1].style.backgroundColor = 'green';
      }
      this.completedPageStats.textContent = parseInt(this.completedPageStats.textContent) + parseInt(library.completedPagesInput.value);
    };

    decreaseReadPages(e) {
      // eslint-disable-next-line eqeqeq
      if (this.completedPageStats.textContent == 0)
        return;
      if (e.target.nextElementSibling.style.backgroundColor === 'green')
        this.completedBookStats.textContent--;
      e.target.nextElementSibling.style.backgroundColor = 'red';
      e.target.parentElement.nextElementSibling.children[1].textContent--;
      // eslint-disable-next-line eqeqeq
      this.completedPageStats.textContent--;
    };

    increaseReadPages(e) {
      if (e.target.previousElementSibling.style.backgroundColor === 'green')
        return;
      this.completedPageStats.textContent++;
      e.target.parentElement.nextElementSibling.children[1].textContent++;
      if (+e.target.parentElement.parentElement.children[3].children[1].textContent === +e.target.parentElement.parentElement.children[3].children[0].textContent) {
        this.completedBookStats.textContent++;
        e.target.previousElementSibling.style.backgroundColor = 'green';
      }
    };
}

class HelperFunctions {
  constructor() {
    this.createElements = (elementType, className, text) => {
      const element = document.createElement(elementType);
      if (className !== undefined)
        element.className = className;
      element.textContent = text;
      return element;
    };
    
    // THIS FUNCTION HELPS WITH EVENT DELEGATION
    this.hasClass = (element, className) => element.className.split(' ').indexOf(className) > -1;
  }
}

const myLibrary = [];
const library = new Library();
const stats = new Information();
const form = new Form();
const helperFunctions = new HelperFunctions();

popupBtn.addEventListener('click', form.displayForm);
cancelBtn.addEventListener('click', form.hideForm);
addBtn.addEventListener('click', library.addBookToLibrary);
document.addEventListener('click', (e) => {
  if (helperFunctions.hasClass(e.target, 'remove-btn')) {
    library.removeBookFromLibrary(e);
    stats.removeBookFromStats(e);
  } else if (helperFunctions.hasClass(e.target, 'decrease')) {
    stats.decreaseReadPages(e);
  } else if (helperFunctions.hasClass(e.target, 'increase')) {
    stats.increaseReadPages(e);
  }
});

function bookHtml() {
  const newBook = helperFunctions.createElements('div', 'book');
  const header = helperFunctions.createElements('div', 'header');
  const bookInfo = helperFunctions.createElements('div', 'book-info');
  const readStatus = helperFunctions.createElements('div', 'read-status');
  const pages = helperFunctions.createElements('div', 'pages');
  const bookTitle = helperFunctions.createElements('div', 'book-title', myLibrary[myLibrary.length - 1].title);
  const bookAuthor = helperFunctions.createElements('div', 'book-author', myLibrary[myLibrary.length - 1].author);
  const readPages = helperFunctions.createElements('div', 'read-pages', myLibrary[myLibrary.length - 1].pages);
  const totalPages = helperFunctions.createElements('div', 'total-pages', library.completedPagesInput.value);

  const editBtn = helperFunctions.createElements('button', 'edit-btn', 'Edit');
  const removeBtn = helperFunctions.createElements('button', 'remove-btn', 'Remove');
  const increaseBtn = helperFunctions.createElements('button', 'increase', '+');
  const decreaseBtn = helperFunctions.createElements('button', 'decrease', '-');
  const completedBtn = helperFunctions.createElements('button', 'completed', 'completed');

  header.appendChild(editBtn);
  header.appendChild(removeBtn);
  readStatus.appendChild(decreaseBtn);
  readStatus.appendChild(completedBtn);
  readStatus.appendChild(increaseBtn);

  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);

  pages.appendChild(readPages);
  pages.appendChild(totalPages);

  newBook.appendChild(header);
  newBook.appendChild(bookInfo);
  newBook.appendChild(readStatus);
  newBook.appendChild(pages);

  books.appendChild(newBook);
}
