const db = require("../dataBase/database");
const {v4: uuidv4} = require('uuid');
const authenticate = (req,res,next) =>{
    if (!req.cookies.userId) {
        const userId = uuidv4();
        db.createUser(userId)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
        res.cookie('userId', userId, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
    }
    next();
}
module.exports = {
    authenticate: authenticate
}