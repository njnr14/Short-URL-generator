const express = require("express");
const urlRoute = require("./routes/url");
const {connectMongoDb}  = require('./connect');

const URL = require('./models/url');


const app = express();
connectMongoDb('mongodb://localhost:27017/short-url').then(console.log("Mongodb connected"));

app.use(express.json())

app.use('/url' , urlRoute);

app.get('/:shortId' , async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {
        $push : {
            visitHistory : {timestamp :Date.now()} ,
        },
    });
    res.redirect(entry.redirectURL);
});

app

const PORT = 8001;

app.listen(PORT , () => console.log(`server started at port : ${PORT} `));