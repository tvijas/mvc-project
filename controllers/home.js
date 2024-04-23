const path = require("../path")
const getHomePage = (req,res) =>{
    res.sendFile(path + "/views/home.html");
}
module.exports = {
    getHomePage:getHomePage
}