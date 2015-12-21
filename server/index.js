var express = require('express'),
    app = express();

app.use(require('body-parser').json());

app.use('/location', require('./location'));

app.get('/', function(req, res) {
    res.send('<h1>Hello world!</h1>');
});

app.listen(process.env.port || 8000);
