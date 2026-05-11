const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Make current user available in every EJS file
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/onboarding', require('./routes/onboarding'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/photos', require('./routes/photos'));
app.use('/critique', require('./routes/critique'));
app.use('/progress', require('./routes/progress'));
app.use('/challenges', require('./routes/challenges'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sightline MVP running at http://localhost:${PORT}`);
});
