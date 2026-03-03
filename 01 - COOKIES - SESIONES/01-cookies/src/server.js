//npm i express cookie-parser

import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import loginRouter from "./routes/login-router.js";
import viewsRouter from "./routes/views-router.js";

const app = express();

app.use(cookieParser(process.env.SECRET_KEY));
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'handlebars');

app.get("/set-cookie", (req, res) => {
  //alert desde front se selecciona el idioma
  //GET /set-cookie?idioma=in
  const { idioma } = req.query;
  res
    .cookie("idioma", idioma, { maxAge: 5000 })
    .json({ message: "cookie generada con exito" });
});

app.get("/get-cookie", (req, res) => {
  console.log(req.cookies);
  const { idioma } = req.cookies;
  idioma === "en" ? res.send("Hello!") : res.send("Hola!");
});

app.get("/set-signed-cookie", (req, res) => {
  res
    .cookie("nombre", "juancito", {
      signed: true,
      httpOnly: true,
      maxAge: 50000,
    })
    .json({ message: "ok" });
});

app.get("/get-cookie-signed", (req, res) => {
  console.log(req.signedCookies);
});

//res.clearCookie('nombreDeLaCookie')

app.use('/login', loginRouter)
app.use('/', viewsRouter)

app.listen(8080, () => console.log("Server running on port 8080"));
