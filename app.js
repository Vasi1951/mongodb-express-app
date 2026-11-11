import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 7000;

// MongoDB connection
const mongoUrl = "mongodb://admin:admin123@localhost:27017";
const databaseName = "library_db";

const client = new MongoClient(mongoUrl);

let db;
await client
  .connect()
  .then(() => {
    db = client.db(databaseName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CRUD API endpoints
// Create a new book - POST /api/v1/books
app.post("/api/v1/books", (req, res) => {
  const { title, author, category, price } = req.body;
  if (!title || !author || !category || !price) {
    const err = new Error("All book fields are required");
    err.status = 400;
    throw err;
  }
  db.collection("books")
    .insertOne({ title, author, category, price })
    .then((result) => {
      const newBook = {
        _id: result.insertedId,
        title,
        author,
        category,
        price,
      };
      res
        .status(201)
        .json({ message: "Book created successfully", data: newBook });
    })
    .catch((err) => {
      throw err;
    });
});

// Get books by category - GET /api/v1/books?category=categoryName
// Get all books - GET /api/v1/books

app.get("/api/v1/books", (req, res) => {
  const category = req.query.category;
  const query = category ? { category } : {};
  db.collection("books")
    .find(query)
    .toArray()
    .then((books) => {
      res
        .status(200)
        .json({ message: "Books fetched successfully", data: books });
    })
    .catch((err) => {
      throw err;
    });
});

// Get a single book by ID - GET /api/v1/books/:id
app.get("/api/v1/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.collection("books")
    .findOne({ _id: new ObjectId(bookId) })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res
        .status(200)
        .json({ message: "Book fetched successfully", data: book });
    })
    .catch((err) => {
      throw err;
    });
});

// Update a book by ID - PUT /api/v1/books/:id
app.put("/api/v1/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, category, price } = req.body;
  if (!title || !author || !category || !price) {
    return res.status(400).json({ message: "All book fields are required" });
  }
  const book = { title, author, category, price };
  db.collection("books")
    .updateOne({ _id: new ObjectId(bookId) }, { $set: book })
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({
        message: "Book updated successfully",
        data: { _id: new ObjectId(bookId), ...book },
      });
    })
    .catch((err) => {
      throw err;
    });
});

// Delete a book by ID - DELETE /api/v1/books/:id
app.delete("/api/v1/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.collection("books")
    .deleteOne({ _id: new ObjectId(bookId) })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      throw err;
    });
});

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
