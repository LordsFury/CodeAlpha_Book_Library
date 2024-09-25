const express = require('express');
const router = express.Router();
const adminModel=require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtSecret = process.env.JWT_SECRET;

router.post('/adsignup', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Length must be atleast 5 characters').isLength({ min: 5 })
], async function (req, res) {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { email, password } = req.body;
        let Admin = await adminModel.findOne({ email });
        if (Admin) {
            return res.status(400).json({success, errors: "Sorry, Admin with this email already exists" });
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        Admin = await adminModel.create({
            email,
            password: hashPassword
        });
        const data = {
            Admin: {
                id: Admin.id
            }
        }
        const adminToken = jwt.sign(data, jwtSecret);
        success=true;
        res.json({success, adminToken});
    } catch (error) {
        return res.status(500).send("Something went wrong" );
    }
});

router.post('/adlogin', [
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
        let Admin = await adminModel.findOne({ email: email });
        if (!Admin) {
            return res.status(400).json({success, error: "Please enter valid credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, Admin.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please enter valid credentials" });
        }
        const data = {
            Admin: {
                id: Admin.id
            }
        }
        let adminToken = jwt.sign(data, jwtSecret);
        success=true
        res.json({success, adminToken });
    } catch (error) {
        console.error(error)
        return res.status(500).send("Something went wrong");
    }
});


module.exports = router;