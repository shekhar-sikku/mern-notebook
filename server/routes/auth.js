import { Router } from 'express';
import { User } from '../models/Users.js';
import { body, validationResult } from 'express-validator';
import fetchuser from '../middleware/fetchuser.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = "Sikku@iNotebook";
const authRouter = Router();

// ROUTE 1 - Create user using POST:"/api/auth/createUser"
authRouter.post('/createUser', [
    body('name', 'name required!').isLength({ min: 3 }),
    body('email', 'required valid email!').isEmail(),
    body('password', 'password at least 5 characters!').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: 'Sorry, User with this E-mail already exists!' })
            }
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass,
            });
            const data = { user: { id: user.id } }
            const auth_jwt = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, "Status": "User Created Successfully!", auth_jwt });
        }
        catch (error) {
            console.log(error.message);
            res.status((500).send("Some Error Occurred!"))
        }
    });

// ROUTE 2 - LogIn user using POST:"/api/auth/logInUser"
authRouter.post('/logInUser', [
    body('email', 'required valid email!').isEmail(),
    body('password', 'please, enter password to login!').exists(),
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success, error: "Sorry, User not found!" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Sorry, Incorrect credentials to login!" });
            }
            const data = { user: { id: user.id } }
            const auth_jwt = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, auth_jwt });
        }
        catch (error) {
            console.log(error.message);
            res.status((500).send("Internal Server Error!"))
        }
    });

// ROUTE 3 - Get details of user using GET:"/api/auth/userDetails"
authRouter.get('/userDetails', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status((500).send("Internal Error Occurred!"))
    }
});

export default authRouter;