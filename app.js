const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const cors = require('cors')
const app = express();

app.use(cookieParser());
app.use(cors());

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: true }));
app.use(express.static('views'));

app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/styles', express.static(__dirname + '/public/styles'));

const authentication = require("./routes/authentication")
const homeRoutes = require("./routes/home");
const bookRouter = require("./routes/book");

app.use(authentication);
app.use('/',homeRoutes);
app.use('/book', bookRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});