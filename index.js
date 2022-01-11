const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./members');
const app = express();

//middleware fnc
//Handlebars middleware

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Init middleware
// app.use(logger);
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/',(req,res)=> res.render('index',{
    title:'Member App',
    members
}));


// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname,'public','index.html'));
//     // if(err) return err;
// });
// Set static folder

app.use(express.static(path.join(__dirname,'public')));
//members api routes

app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));