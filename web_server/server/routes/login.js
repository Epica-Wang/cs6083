var router = require('express').Router();
var pool = require('../config/mysql.js');

router.post('/', function(req, res, next){
  const user = req.body;
  const username = user.username;
  const password = user.password;

  console.log('login entered: username=' + username + ' password=' + password);
  /**
  needs to be updated
  */
  const loginQuery = 'select userName from User where userName = "' + username + '"and uPassword = "' + password + '"';
  console.log(loginQuery);
  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(loginQuery, function(error, results, fields){
      conn.release(); // done with the connection

      if(error){
        res.status(400).json({
          success: false,
          message: 'Failed to login'
        });
      };  // error querying

      if(results.length === 0){
        res.status(400).json({
          success: false,
          message: 'Failed to login'
        });
      }
      //
      // console.log(results);

      res.status(200).json({
        success: true,
        message: results
      });  // return result to client
    });
  });
});

module.exports = router;
