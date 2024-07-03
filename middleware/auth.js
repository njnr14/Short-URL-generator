const {getUser} = require("../service/auth");


async function  restricToLoggedInUserOnly(req,res,next){
    console.log(req);
    const userUid = req.cookies?.uid;
    if(!userUid)return res.redirect("/login");
    user = getUser(userUid);
    if(!user)return res.redirect("/login");

    req.user = user;
    next();

}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restricToLoggedInUserOnly,
    checkAuth,
}