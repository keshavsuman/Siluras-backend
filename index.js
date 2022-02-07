const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://admin:siluras_7272@siluras.com:27017/doctor', { useNewUrlParser: true },()=>{
    console.log("Database connected");
});

app.use('/api',routes);

app.listen(9000, () => console.log('Server started on port 9000'));