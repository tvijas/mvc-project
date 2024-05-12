const path = require("../path")
const db = require("../dataBase/database")
const renderHomePage = (req,res) =>{
    const user_token = req.cookies.userId;
    db.getBooks(user_token).then(books =>{
        res.render(path + "/views/renderHome.ejs", { books });
    }).catch(error=>{
        console.log(error);
        res.send('<Html lang="en"><body<h5>Bad Request</h5></body></Html>')
    })
}
module.exports = {
    renderHomePage: renderHomePage
}