const Users = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expiry = 60 * 60 * 1;
const secret = 'mancity.com';

const createToken = ({_id}) => {
    return jwt.sign({_id}, secret,  {expiresIn: expiry * 1000})
}

exports.adduser = async (req, res) => {
    try {
        const {username, email, password, designation} = req.body;
        const hashpass = await bcrypt.hash(password, 12);
        const newuser = new Users({
            username: username,
            email: email,
            designation: designation,
            password: hashpass
        })

        await newuser.save();
    } catch (error) {
        console.log('Err on add user', error)
    }
}

exports.allusers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.log('Err on all users', error)
    }
}

exports.userdetails = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById(id)
        res.json(user);
    } catch (error) {
        console.log('Err on user details', error)
    }
}

exports.edituser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById(id)
        res.json(user);
    } catch (error) {
        console.log('Err on edit user', error)
    }
}

exports.updateuser = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, email, password} = req.body;
        const hashpass = await bcrypt.hash(password, 12);
        await Users.findByIdAndUpdate(id, {
            username: username,
            email: email,
            password: hashpass
        })
    } catch (error) {
        console.log('Err on update user')
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email }); // Find user by email

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password); // Compare passwords
            if (isPasswordValid) {
                const token = createToken(user._id);
                res.cookie(jwt, token, {httpOnly: true, maxAge: expiry * 1000})
                res.json({
                    success: true,
                    token,
                    message: 'Success',
                    username: user.username, // Include the username in the response
                    email: user.email, // Include the email in the response
                    designation: user.designation,
                  });
            } else {
                // Passwords do not match
                res.json({ success: false, message: 'Invalid' });
                console.log('Invalid password');
            }
        } else {
            // User not found
            res.json({ success: false, message: 'Notfound' });
            console.log('User not found');
        }
    } catch (error) {
        res.json({ success: false, message: 'error' });
        console.log('Error on login page:', error);
    }
}

exports.deleteuser = async (req, res) => {
    try {
        const {id} = req.params;
        await Users.findByIdAndRemove(id)
    } catch (error) {
        console.log('Err on delete user', error)
    }
}