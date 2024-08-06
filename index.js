const express = require("express");
const path = require("path")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) =>{
    return res.render("home")
})

app.listen(port, () => console.log(`Server started at port http://localhost:${port}`));
