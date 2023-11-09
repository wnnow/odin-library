const library = [];
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector(".form-input");

function toggleDisplayForm() {
  if (form.style.display === "" || form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
}

addBookBtn.addEventListener("click", toggleDisplayForm);

function Book(name, author, page, readStatus) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.readStatus = readStatus;
}

function addBookToLibrary() {}
