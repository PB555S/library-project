
const addBookBtn = document.getElementById("add-book-btn");
const bookDialog = document.getElementById("book-dialog");
const cancelBtn = document.getElementById("cancel-btn");
const bookForm = document.getElementById("book-form");
const bookDisplay = document.getElementById("book-display"); 

let myLibrary = []; 

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}


addBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  bookDialog.close();
});


bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read-status").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks(); 

  bookDialog.close();
  bookForm.reset(); 
});


function displayBooks() {
  bookDisplay.innerHTML = ""; 

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
      <button class="toggle-read-btn">Toggle Read</button>
      <button class="delete-btn">Delete</button>
    `;

    bookDisplay.appendChild(card);

  
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      myLibrary = myLibrary.filter(b => b.id !== book.id);
      displayBooks(); 
    });

    const toggleReadBtn = card.querySelector(".toggle-read-btn");
    toggleReadBtn.addEventListener("click", () => {
      book.read = !book.read;
      displayBooks(); 
    });
  });
}