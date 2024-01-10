const library = [];
let dataIndex = 0;

const inputPagesNum = document.querySelector("#book_page_no");

inputPagesNum.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  let maxLength = e.target.maxLength;
  if (inputValue.length > maxLength) {
    e.target.value = inputValue.slice(0, maxLength);
  }
});

const form = document.querySelector(".form-input");

function toggleDisplayForm() {
  debugger; // This will pause execution here
  console.log("Button clicked! Event listener is working.");
  if (form.style.display === "" || form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

// reading status
function toggleReadingDataSet(e, dataset) {
  if (dataset === "true") {
    e.dataset.read = "false";
  } else {
    e.dataset.read = "true";
  }
}

function toggleReadingStatusText(e, dataset) {
  if (dataset === "true") {
    e.textContent = "Unread";
  } else {
    e.textContent = "Read";
  }
}

function toggleReadingStatusCheckBox(e, dataset) {
  if (dataset === "false") {
    e.target.textContent = "check_box";
  } else {
    e.target.textContent = "check_box_outline_blank";
  }
}

// update status sector
function updateReadingStatus(e) {
  let card = e.target.closest(".card");
  let dataset = card.dataset.read;
  let readingStatusText;

  if (e.target === undefined) {
    readingStatusText = e.closest('button[type="button"]').nextElementSibling;
  } else {
    readingStatusText = e.target.parentElement.nextElementSibling;
  }
  toggleReadingDataSet(card, dataset);
  toggleReadingStatusCheckBox(e, dataset);
  toggleReadingStatusText(readingStatusText, dataset);
}

const readingCheckboxSpans = Array.from(
  document.querySelectorAll(".toggle-reading-checkbox")
);

readingCheckboxSpans.forEach((e) =>
  e.addEventListener("click", updateReadingStatus)
);

const addBookBtn = document.querySelector(".add-book-btn");

addBookBtn.addEventListener("click", toggleDisplayForm);

const formBackBtn = document.querySelector("button.form-back-btn");

formBackBtn.addEventListener("click", toggleDisplayForm);

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.dataIndex = dataIndex++;
}

function addBookToLibrary(book) {
  library.push(book);
}

const newBookFormSubmitBtn = document.querySelector(".form-submit-btn");

newBookFormSubmitBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  if (form.checkValidity()) {
    const bookTitle = document.querySelector("#book_title").value;
    const bookAuthor = document.querySelector("#book_author").value;
    const pages = document.querySelector("#book_page_no").value;
    const readingStatus = document.querySelector(
      'input[name="reading_status"]:checked'
    ).value;
    const book = new Book(bookTitle, bookAuthor, pages, readingStatus);

    addBookToLibrary(book);
    createCard(book);
    toggleDisplayForm();
    newBookform.reset();
  }
});

const newBookform = document.querySelector("#new-book-form");

newBookform.addEventListener("submit", (e) => {
  e.preventDefault();
});

function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (item.readStatus === "unread") {
    card.setAttribute(`data-read`, `false`);
  } else {
    card.setAttribute(`data-read`, `true`);
  }

  card.setAttribute("data-index", `${item.dataIndex}`);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = `${item.title}`;

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = `${item.author}`;

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `${item.pages}`;

  const readingStatus = document.createElement("div");
  readingStatus.classList.add("reading-status");

  const btnSpanCheckboxContainer = document.createElement("button");
  btnSpanCheckboxContainer.setAttribute("type", "submit");

  const btnSpanCheckbox = document.createElement("span");
  btnSpanCheckbox.classList.add(
    "material-symbols-outlined",
    "toggle-reading-checkbox"
  );

  const readingStatusText = document.createElement("div");

  readingStatusText.classList.add("reading-status-text");

  if (item.readStatus === "read") {
    btnSpanCheckbox.textContent = `check_box`;
    readingStatusText.textContent = "Read";
  } else if (item.readStatus === "unread") {
    btnSpanCheckbox.textContent = `check_box_outline_blank`;
    readingStatusText.textContent = "Unread";
  }

  btnSpanCheckboxContainer.append(btnSpanCheckbox);
  readingStatus.appendChild(btnSpanCheckboxContainer);
  readingStatus.appendChild(readingStatusText);

  const btnClosingSpanContainer = document.createElement("button");
  btnClosingSpanContainer.setAttribute("id", "close-btn");

  const closingSpan = document.createElement("span");

  closingSpan.classList.add("material-symbols-outlined");
  closingSpan.textContent = "close";
  btnClosingSpanContainer.appendChild(closingSpan);
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(pages);
  card.appendChild(readingStatus);
  card.appendChild(btnClosingSpanContainer);
  cardContainer.appendChild(card);

  btnClosingSpanContainer.addEventListener("click", removeCard);
  btnSpanCheckbox.addEventListener("click", updateReadingStatus);
}

const cardContainer = document.querySelector(".card-container");

function removeCard(e) {
  cardContainer.removeChild(e.target.closest(".card"));

  let cardIndex = Number(e.target.closest(".card").getAttribute("data-index"));
  let objectIndex = library.map((e) => e.dataIndex).indexOf(cardIndex);

  library.splice(objectIndex, 1);
}

// class Book {
//   static dataIndex = 0;

//   constructor(title, author, pages, readStatus) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.readStatus = readStatus;
//     this.dataIndex = dataIndex++;
//   }
// }

// class Library extends Book {
//   static #books = [];
//   constructor() {
//     super();
//   }

//   static addBook(book) {
//     Library.#books.push(book);
//   }

//   static removeCard(e) {}
// }
