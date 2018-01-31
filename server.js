const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logEntry = `${now}: ${req.method}: ${req.hostname}: ${req.protocol}: ${req.url}`;

  fs.appendFile('server.log', logEntry + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log');
    }
  });
  console.log(logEntry);

  next();
});

// app.use((req, res, next) => {
//
//   res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {``
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my depressingly dull home page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Portfolio'
  });
});

app.get('/bad', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    errorMessage: 'You chose poorly'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
