const express = require ('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.json());

//Routes
app.use(require('./routes/persona'));

//startin the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

module.exports = app