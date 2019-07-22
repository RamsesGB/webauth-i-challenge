const bcrypt = require('bcryptjs'); 

const Users = require('../users-helper/users-model.js'); 

module.exports = authenticate;

function authenticate(req, res, next) {
  const { username, password } = req.headers;

  // find the users in the DB
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next(); 
      } else {
        res.status(401).json({ message: 'You shall not pass!!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}