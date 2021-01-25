const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('600c5d1b24cfce3cd48ea4e5')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://manojkale:WIbYJVutZu4eQnE6@cluster0.vaiwi.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {

        const user = new User({
          name: 'Manoj',
          email: 'manojkale303@gmail.com',
          cart: {
            items: []
          }
        })
        user.save();
      }
    })
    console.log('connected successfully')
    app.listen(3000)
  }).catch(error => {
    console.log(error)
  })