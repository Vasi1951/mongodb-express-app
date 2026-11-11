const url = "http://localhost:7000/api/v1/books";

const createBook = (book) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const readAllBooks = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const readBookById = (id) => {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const updateBookById = (id, updatedData) => {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

const deleteBookById = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

// createBook({
//   title: "Sample Book",
//   author: "Author Name",
//   // category: "Fiction",
//   price: 2000,
// });

readAllBooks();
// readBookById("6ab3ff467c6bcffc85d500ce");
// updateBookById("6ab3ff467c6bcffc85d500ce", {
//   title: "Updated Sample Book",
//   author: "Updated Author Name",
//   category: "Non-Fiction",
//   price: 1500,
// });
//deleteBookById("6ab3ff467c6bcffc85d500ce");
