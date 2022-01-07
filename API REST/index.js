const express = require('express');
const cors = require('cors');
const { json, application } = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE', 'OPTIONS', 'HEAD');
    next();
});

app.use(require('./routes/index'));

app.listen(3000, () => {
    console.log("Server listening on Port 3000");
});

app.get('/', function(req, res){

});