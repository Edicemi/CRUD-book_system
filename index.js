const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');
const books = require("./books.json");

const app = express()



// app.use(express.urlencoded())

const filePath = path.join(__dirname, 'books.json')
console.log(filePath)

// saving
const save = (newArray) => {
    console.log(newArray)
    fs.writeFileSync(filePath, JSON.stringify(newArray))
}

// reading
app.get('/bookTitle', (req, res) => {
    const newArray = fs.readFileSync(filePath);
    res.json({
        books: JSON.parse(newArray)
    })
})

app.get('/bookTitle/:id', (req, res) => {

    const findBook = books.find((book) => book.book === req.params.id)
    res.json(findBook)
})

//Create function
app.post('/bookTitle', bodyParser.json(), (req, res) => {
    const newbook = [...books, { id: books.length + 1, title: req.body.title }];
    console.log(books)
    save(newbook);
    res.json({
        newbook
    })
})

//Update function
app.put('/bookTitle/:id', bodyParser.json(), (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const newArray = books.map(item => {
        if (item.id === +id) {
            item.title = title
        }
        return item
    })
    console.log(newArray)

    save(newArray)
    res.json({
        status: 'success',
        newArray
    })
})

//Delete function
app.delete('/bookTitle/:id', (req, res) => {
    const bk = books.filter((book) => book.id !== +req.params.id)
    save(bk)
    res.json({
        status: 'success',
        removed: req.params.id,
        newLength: bk.length,
    })
})

app.listen(9090, () => {
    console.log('localhost running:9090')
})