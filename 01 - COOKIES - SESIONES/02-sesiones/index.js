import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  cookie: { maxAge: 10000 },
  saveUninitialized: true,
  resave: false,
};

app.use(cookieParser(process.env.SECRET_KEY));
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    username: "juan",
    password: 1234,
    admin: true,
  },
  {
    username: "jose",
    password: 123456,
    admin: false,
  },
];

app.post('/login', (req, res)=>{
    const { username, password } = req.body;
    const index = users.findIndex(user => user.username === username && user.password === password);
    if(index === -1) return res.status(401).send("Invalid credentials");
    const user = users[index];
    req.session.info = {
        loggedIn: true,
        contador: 1,
        admin: user.admin
    }
    //req.session.pepito = "hola";
    //req.session.username = user.username;
    res.json({ message: 'Bienvenido/a' })
})

app.get('/get-info', (req, res)=>{
    console.log(req.session)
    res.json(req.session.info);
})

app.listen(8080, () => console.log("Server running on port 8080"));
