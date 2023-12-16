import jwt from 'jsonwebtoken';
const JWT_SECRET = "Sikku@iNotebook";

const fetchuser = (req, res, next) => {
    const token = req.header('auth_jwt');
    if (!token) {
        res.status(401).send({ error: "Invalid Authentication!" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Invalid Authentication!" });
    }
}

export default fetchuser;