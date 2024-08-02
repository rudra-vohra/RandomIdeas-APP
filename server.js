const path = require('path')
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT || 5000;


const app = express();

app.use(cors({
  origin:['http://localhost:5000', 'http://localhost:3000'],
  credentials: true,
}))
// Setting up express static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send({mesage: 'Welcome to RandomIdeas API'})
})

const ideasRouter = require('./routes/ideas')
app.use('/api/ideas', ideasRouter);


app.listen(port, () =>{
  console.log(`Server Listening on port ${port}`);
})