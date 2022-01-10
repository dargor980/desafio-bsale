const express = require('express');
const cors = require('cors');
const utils = require('./controllers/utils');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE', 'OPTIONS', 'HEAD');  
    next();
});

app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(utils.getHostInfo());
    console.log(`Server iniciado en el puerto ${port}`);
});

app.get('/', function (req, res) {

});