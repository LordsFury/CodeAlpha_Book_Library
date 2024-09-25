const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bookModel=require('../models/bookModel');
const UserLoggedIn = require('../middlewares/UserLoggedIn');
const fetchUser=require('../middlewares/fetchUser');
const jwtSecret = process.env.JWT_SECRET;

router.post('/signup', [
    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Length must be atleast 5 characters').isLength({ min: 5 })
], async function (req, res) {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { name, email, password } = req.body;
        let User = await userModel.findOne({ email });
        if (User) {
            return res.status(400).json({success, errors: "Sorry, User with this email already exists" });
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        User = await userModel.create({
            name,
            email,
            password: hashPassword
        });
        const data = {
            User: {
                id: User.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        success=true
        res.json({success, authToken});
    } catch (error) {
        return res.status(500).send("Something went wrong" );
    }
});

router.post('/login', [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password cannot be blank.").exists()
], async function (req, res) {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let User = await userModel.findOne({ email: email });
        if (!User) {
            return res.status(400).json({success, error: "Please enter valid credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, User.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please enter valid credentials" });
        }
        const data = {
            User: {
                id: User.id
            }
        }
        let authToken = jwt.sign(data, jwtSecret);
        success=true
        res.json({success, authToken });
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong");
    }
});

router.post('/editprofile', fetchUser, [
    body('nname', 'Enter a valid name').isLength({ min: 3 }),
    body('nemail', 'Enter a valid email').isEmail(),
    body('ppassword', 'Previous password must be at least 5 characters').isLength({ min: 5 }),
    body('npassword', 'New password must be at least 5 characters').optional().isLength({ min: 5 }) 
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { nname, nemail, ppassword, npassword } = req.body;
        let user = await userModel.findById(req.user.id);  
        if (!user) {
            return res.status(400).json({ success, errors: "User not found" });
        }
        const passwordCompare = await bcrypt.compare(ppassword, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Previous password is incorrect" });
        }
        if (nemail !== user.email) {
            let emailCheck = await userModel.findOne({ email: nemail });
            if (emailCheck) {
                return res.status(400).json({ success, errors: "Sorry, a user with this email already exists" });
            }
        }
        if (npassword) {
            let salt = await bcrypt.genSalt(10);
            npassword = await bcrypt.hash(npassword, salt);
        }
        user = await userModel.findByIdAndUpdate(
            req.user.id, 
            {
                name: nname,
                email: nemail,
                password: npassword || user.password 
            },
            { new: true }
        );
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong");
    }
});


router.post("/addtoshelf", UserLoggedIn, async function (req, res) {
    let success = false;
    let msg = "";
    let { title } = req.body;
    let book = await bookModel.findOne({ title });
    let userid = req.user.id;
    let user = await userModel.findOne({ _id: userid }).populate("book");
    if (!book) {
        return res.status(400).json("Book Not Found");
    }
    try {
        let bookExists = false;
        for (let userbook of user.book) {
            if (userbook._id.equals(book._id)) {
                msg = "Book Already in Shelf";
                res.json({ success, msg });
                bookExists = true;
                break;
            }
        }
        if (!bookExists) {
            success = true;
            msg = "Book Added to Shelf";
            user.book.push(book._id);
            await user.save();
            res.json({ success, msg });
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});

router.post("/removefromshelf", UserLoggedIn, async function (req, res) {
    let success = false;
    let msg = "";
    let { title } = req.body;
    let book = await bookModel.findOne({ title });
    let userid = req.user.id;
    let user = await userModel.findOne({ _id: userid }).populate("book");
    if (!book) {
        return res.status(400).json("Book Not Found");
    }
    try {
        let bookExists = false;
        for (let userbook of user.book) {
            if (userbook._id.equals(book._id)) {
                success = true;
                user.book.splice(user.book.indexOf(book._id),1);
                await user.save();
                msg = "Book Removed from Shelf";
                res.json({ success, msg });
                bookExists = true;
                break;
            }
        }
        if (!bookExists) {
            msg = "Book Already in Shelf";
            res.json({ success, msg });
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});

router.get("/shelfbooks", UserLoggedIn, async function(req,res){
    let userid=req.user.id;
    let User=await userModel.findOne({_id: userid}).populate("book");
    res.json({books: User.book});
})


module.exports = router;