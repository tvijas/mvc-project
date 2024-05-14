const path = require("../path")
const db = require("../dataBase/requests")
const renderHomePage = (req,res) =>{
    const user_token = req.cookies.userId;
    db.getBooks(user_token).then(books =>{
        res.render(path + "/views/renderHome.ejs", { books });
    }).catch(error=>{
        console.log(error);
        res.send('<Html lang="en"><body><h2>Bad Request</h2><br><h5>Refresh page or clear cookies</h5></body></Html>')
    })
}
module.exports = {
    renderHomePage: renderHomePage
}