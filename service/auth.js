
// //stateFull authentication

// const sessionIdToUserMap = new Map();

// function setUser(id , user){

//     sessionIdToUserMap.set(id,user);

// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }


//stateLess Authentication

const  jwt = require('jsonwebtoken');
const secret = "Piyush$123@$"; 


function setUser(user){
    const token = jwt.sign({
        _id : user._id,
        email : user.email,
    },secret);
    console.log(token);
   return token;

}


function getUser(token){
    if(!token)return null;
    console.log(token);
    try{
    return jwt.verify(token , secret);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}