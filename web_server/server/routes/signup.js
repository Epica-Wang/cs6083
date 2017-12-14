var router = require('express').Router();
var pool = require('../config/mysql.js');

router.post('/', function(req, res, next){
  const user = req.body;
  const username = user.username;
  const firstname = user.firstname;
  const lastname = user.lastname;
  const email = user.email;
  const password = user.password;
  const city = user.city;

  console.log('signup entered: ' + JSON.stringify(user));

  /**
  needs to be updated
  */
  const signupQuery = 'insert into User values (?,?,?,?,?,?)';

  console.log(signupQuery);

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(signupQuery,[username,password,firstname,lastname,city,email],function(error, results, fields){
      conn.release(); // done with the connection

      if(error){
        console.log(error);
        res.status(400).json({
          success: false,
          message: 'Failed to signup',
          errors: {
            username: 'This username is already taken'
          }
        });
      }else{
          res.status(200).json({
          success: true,
          message: 'You have successfully signed up'
        });
      }

    });
  });
});

module.exports = router;
