const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector(".form-input");
const readingCheckboxSpans = Array.from(
  document.querySelectorAll(".toggle-reading-checkbox")
);
const library = [];

function toggleDisplayForm() {
  if (form.style.display === "" || form.style.display === "block") {
    form.style.display = "none";
  } else {
    form.style.display = "block";
  }
}

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
function updateReadingStatus(e) {
  let card = e.target.closest(".card");
  let dataset = card.dataset.read;
  let readingStatusText = e.target.closest(
    'button[type="button"]'
  ).nextElementSibling;

  toggleReadingDataSet(card, dataset);
  toggleReadingStatusCheckBox(e, dataset);
  toggleReadingStatusText(readingStatusText, dataset);
}
readingCheckboxSpans.forEach((e) =>
  e.addEventListener("click", updateReadingStatus)
);
addBookBtn.addEventListener("click", toggleDisplayForm);

function Book(name, author, page, readStatus) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.readStatus = readStatus;
}

function addBookToLibrary() {}
