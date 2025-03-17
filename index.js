const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let books = [ ];

//done
app.get('/whoami',(req,res) => {
    res.send({studentNumber:"2577390"});
});

//done
app.get('/books',(req,res) => {
    res.send(books);
});

//done
app.get('/books/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const book = books.find( bk => bk.id === id);
    if(!book){
        res.status(404).send({"error": "The book is not found"});
    }
    res.send(book);
});


//done
app.post('/books',(req,res) => {

    if(!req.body.title || !req.body.details){
        res.status(400).send({"error": "Missing required book details"});
        return;
    }

    let book = {
        "id": books.length + 1,
        "title": req.body.title,
        "details": req.body.details
    };

    books.push(book);
    res.send(book);
});

//done
app.put('/books/:id',(req,res) => {

    const id = parseInt(req.params.id);
    let book = books.find( bk => bk.id === id);
    if(!book){
        res.status(404).send({"error": "The book is not found"});
    }

    book.title = req.body.title;
    book.details = req.body.details;
    res.send(book);
    
});

//done
app.post('/books/:id/details',(req,res) => {

    if(!req.body || !req.body.author || !req.body.genre ||!req.body.publicationYear){
        res.status(400).send({"error": "Missing required book details"});
        return;
    }

    const id = parseInt(req.params.id);
    let book = books.find( bk => bk.id === id);

    let details =    
    {
        "id": book.details.length + 1,
        "author": req.body.author,
        "genre": req.body.genre,
        "publicationYear": req.body.publicationYear
    };

    book.details.push(details);
    res.send(book);
});

//done
app.delete('/books/:id',(req,res) => {

    const id = parseInt(req.params.id);
    books = books.filter((bk) => bk.id !== id);
    res.send(books);
});

//done
app.delete('/books/:id/:detailId',(req,res) => {

    const id = parseInt(req.params.id);
    const detailId = parseInt(req.params.detailId);
    let book = books.find( bk => bk.id === id);
    book.details = book.details.filter((dt) => dt.id !== detailId);
    res.send(books);

});

//done
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
