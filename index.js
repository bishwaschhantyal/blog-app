const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
app.get("/", (req, res) =>{
    res.end("Hello World!")
})

app.listen(port, () => console.log(`Server started at port http://localhost:${port}`));
