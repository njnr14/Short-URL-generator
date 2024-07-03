require('dotenv').config()


const express = require("express");
const {connectMongoDb}  = require('./connect');
const URL = require('./models/url');
const path = require("path");
const cookieParser = require("cookie-parser");
const {restricToLoggedInUserOnly , checkAuth}  = require("./middleware/auth")


//routes
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require('./routes/user');


const app = express();

//connect mongoDb
// connectMongoDb('mongodb://localhost:27017/short-url').then(console.log("Mongodb connected"));
connectMongoDb(process.env.MONGO_URL).then(console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views" , path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



//routes
app.use('/url' , restricToLoggedInUserOnly, urlRoute);
app.use('/user' , userRoute);
app.use('/',checkAuth, staticRoute);

app.get('/url/:shortId' , async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {
        $push : {
            visitHistory : {timestamp :Date.now()} ,
        },
    });
    res.redirect(entry.redirectURL);
});

app

const PORT = process.env.PORT || 8001;

app.listen(PORT , () => console.log(`server started at port : ${PORT} `));