const path = require('path');
const express = require('express');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebars = require('handlebars');
const handlehelpers = require('handlebars-helpers')();


const app = express();
const PORT = process.env.PORT || 8080;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    // sets cookie to expire in 5 minutes
    maxAge: 300000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

handlebars.registerHelper(handlehelpers);


app.use(session(sess));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`));
});