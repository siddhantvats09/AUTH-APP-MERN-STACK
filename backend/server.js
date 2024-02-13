const express = require('express')
const app = express()
const bodeParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
//const User = require('./Modals/Users')
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwt = require('jsonwebtoken')




const secret = "secret123"

//mongodb+srv://siddhant:<password>@cluster0.qsom66y.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://siddhant:siddhantvats@cluster0.qsom66y.mongodb.net/

mongoose.connect('mongodb+srv://siddhant:siddhantvats@cluster0.qsom66y.mongodb.net/AuthData?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const usersschema = new mongoose.Schema({
    email: String,
    password: String,
});

const USER = mongoose.model('USER', usersschema);


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser())
app.use(express.json())
app.use(bodeParser.json({ extended: true }))
app.listen(4000,(req,res)=>{
        console.log("server is running")
})

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/", async (req, res) => {
    const payload = jwt.verify(res.cookie.token, secret)
    await USER.findById(payload.id)
        .then((userinfo) => {
            res.json({ id: userinfo._id, email: userinfo.email })
        })
})

app.post("/register", async(req, res) => {
    const { email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10)
    const user = new USER({ password: hashedpassword, email: email })
    await user.save().then((userinfo) => {
        jwt.sign({ id: userinfo._id, email: userinfo.email }, secret, (err, token) => {
            if (err) {
                console.log(err)
                res.sendStatus(500);
            } else {
                 res.cookie('token', token).json({ id: userinfo._id, email: userinfo.email });
            }
        })
    })
    //res.json(user);

})

app.post('/login',async(req, res) => {
    const { email, password } = req.body
   await USER.findOne({ email })
        .then((userinfo) => {
            const passok = bcrypt.compareSync(password, userinfo.password)
           if(passok){
           jwt.sign({ id: userinfo._id, email: userinfo.email }, secret, (err, token) => {
              
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                } else {
                    res.cookie('token', token).json({ id: userinfo._id, email: userinfo.email });
                }
            })
           }else{
            res.sendStatus(401)
           }
        })
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').send()
})