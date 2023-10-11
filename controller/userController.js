const users = require('../model/userSchema')
const authHelper = require('../helper/authHelper')
const jwt = require('jsonwebtoken')

//Register logic
exports.register = async (req, res) => {
    try {
        const {name,email,password,mobile,address} = req.body
        if (!name || !email || !password || !mobile || !address) {
            return res.status(403).send({ error: "All fields are required" })
        }
        // Check if the user with the mail exists in DB or not
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                Message: "User Already Registered",
            })
        }
        // hash user entered password 
        const hashedPassword = await authHelper.hashPassword(password)
        //create new object for users
        const newUser = new users({
            name,
            email,
            password: hashedPassword,
            mobile,
            address  
        })
        // save newly created user to mongoDB
        await newUser.save()
        res.status(200).send({
            success: true,
            message: "New User Registeration Successfull",
            newUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Registeration",
            error
        })
    }
}
// Login Logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(200).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const user = await users.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `Email is not registered`
            })
        }
        const match = await authHelper.comparePasswords(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password",
            })
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address
            },
            token
        })
    } catch (error) {
        res.status(403).send({
            success: false,
            message: "Error in login ",
            error
        })
    }
}

// JWT test
exports.test = async (req, res) => {
    res.status(200).send("Inside Protected Route")
}