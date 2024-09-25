const express = require('express');
const router = express.Router();
const AdminLoggedIn = require('../middlewares/AdminLoggedIn');
const { body, validationResult } = require('express-validator');
const BookModel = require('../models/bookModel');
const Upload = require('../config/multerconfig');
const bookModel = require('../models/bookModel');

router.post('/addbook', AdminLoggedIn, Upload.single("Image"), [
    body('title', "Title cannot be Empty").exists(),
    body('author', "Author name is required").exists(),
    body('category', "Category must be at least 3 characters").isLength({min: 3}),
    body('description', "Description must be at least 5 characters").isLength({min: 5}),
    body('price', "Price cannot be empty").exists()
], async function(req, res) {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { title, author, category, description, price } = req.body;
        let Image = req.file ? req.file.filename : null; 
        let existingBook = await BookModel.findOne({ title });
        if (existingBook) {
            return res.status(400).json({ success, error: "Book with this title already exists" });
        }
        let newBook = await BookModel.create({
            title,
            author,
            category,
            description,
            price,
            Image
        });
        success = true;
        res.json({ success, book: newBook });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success, error: "Internal server error" });
    }
});

router.get("/fetchbooks", async function(req,res){
    try {
        let Books=await BookModel.find();
        res.json(Books);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

router.post("/getreleventbooks", async function(req, res) {
    try {
        const { category } = req.body;
        let Books = await BookModel.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
        res.json(Books);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
});


router.delete('/deletebook/:id', AdminLoggedIn, async function(req,res){
    try {
        let book=await bookModel.findOne({_id: req.params.id})
        if(!book){
            return res.status(404).send("Not Found");
        }
        book=await bookModel.findOneAndDelete({_id: req.params.id});
        res.json({"success": "Book has been Deleted", book});
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

router.put('/updatebook/:id', AdminLoggedIn, Upload.single("Image"), async function(req,res){
    try {
        let{title,author,category,description,price}=req.body;
        let Image = req.file ? req.file.filename : null; 
        const newBook={title,author,category,description,price,Image};
        let book=await bookModel.findOne({_id: req.params.id})
        if(!book){
            return res.status(404).send("Not Found");
        }
        book=await bookModel.findOneAndUpdate({_id: req.params.id}, {$set: newBook}, {new: true});
        res.json({"success": "Book has been Updated", book});
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

module.exports = router;
