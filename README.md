# MongoDB Express Books API

A REST API for creating, listing, filtering, retrieving, updating, and deleting books. The API uses Express and stores books in MongoDB.

## Requirements

- Node.js 18 or later
- npm
- Docker with the Docker Compose plugin, or a MongoDB server configured to match the connection settings in `app.js`

## Run locally

From this directory, start MongoDB:

```sh
docker compose up -d
```

Install dependencies and start the API:

```sh
npm install
npm start
```

The server listens at `http://localhost:7000`. For automatic restarts during development, use `npm run dev`.

The app connects to `mongodb://admin:admin123@localhost:27017` and uses the `library_db` database. Docker Compose creates a MongoDB 8 container with these local development credentials and persists its data in a named volume.

## API

All endpoints use the `/api/v1/books` base path and accept and return JSON.

| Method   | Path                             | Description                    |
| -------- | -------------------------------- | ------------------------------ |
| `POST`   | `/api/v1/books`                  | Create a book                  |
| `GET`    | `/api/v1/books`                  | List all books                 |
| `GET`    | `/api/v1/books?category=Fiction` | List books in a category       |
| `GET`    | `/api/v1/books/:id`              | Get one book by its MongoDB ID |
| `PUT`    | `/api/v1/books/:id`              | Replace a book's fields        |
| `DELETE` | `/api/v1/books/:id`              | Delete a book                  |

Books have `title`, `author`, `category`, and `price` fields. All four are required when creating or updating a book.

### Examples

Create a book:

```sh
curl.exe -X POST http://localhost:7000/api/v1/books -H "Content-Type: application/json" -d "{\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"category\":\"Science Fiction\",\"price\":19.99}"
```

List books, optionally filter by category:

```sh
curl.exe "http://localhost:7000/api/v1/books"
curl.exe "http://localhost:7000/api/v1/books?category=Science%20Fiction"
```

Get, update, or delete a book by replacing `<id>` with the `_id` returned by the API:

```sh
curl.exe "http://localhost:7000/api/v1/books/<id>"
curl.exe -X PUT http://localhost:7000/api/v1/books/<id> -H "Content-Type: application/json" -d "{\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"category\":\"Science Fiction\",\"price\":21.99}"
curl.exe -X DELETE "http://localhost:7000/api/v1/books/<id>"
```

Successful responses include a message and, where applicable, the book data. Missing books return `404`; requests missing required fields return `400`.

## Manual check

With MongoDB and the API running, execute:

```sh
node test.js
```

This script lists all books and prints the response. It is a manual smoke check, not an automated test suite.
