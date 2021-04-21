const express = require("express");
const books = require("./books")

const app = express()
app.use(express.json())

app.listen(9090, () => {
    console.log("localhost running:9090");
})


app.get('/', (req, res) => {
    res.json({ message: "Working" })
})

app.get('/api/books', (req, res) => {
    res.json(books)
})

app.post('/api/books', (req, res) => {
    const title = {
        id: books.length + 1,
        books: req.body.books
    }
    books.push(title)
    res.json(books)
})

app.put('/api/books/:id', (req, res) => {
    let id = req.params.id

    let books = req.body.books

    let index = books.findIndex((books) => {
        return (books.id == Number.parseInt(id))
    })

    console.log(id, req.body, index);

    if (index >= 0) {
        let book = books[index]
        book.books = books
        res.json(book)
    } else {
        res.status(404)
        res.end()
    }

    console.log(id);
    res.json(id)
})

app.delete("/api/books/:id", (req, res) => {
    let id = request.params.id;
    let index = books.findIndex((books) => {
        return (books.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let book = books[index]
        books.splice(index, 1)
        res.json(book)
    } else {
        res.status(404)
    }

})