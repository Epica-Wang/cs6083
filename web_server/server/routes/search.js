var router = require('express').Router();
var pool = require('../config/mysql.js');

router.get('/artist/:aname', function(req, res, next){
  const aname = req.params['aname'];
  console.log('retrieving artists matching ' + aname);

  /**
  needs to be updated
  */
  const artistSearchQuery = 'select * from Artist';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(artistSearchQuery, function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

router.get('/user/:username', function(req, res, next){
  const username = req.params['username'];
  console.log('retrieving user matching ' + username);

  /**
  needs to be updated
  */
  const userSearchQuery = 'select * from User';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userSearchQuery, function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

router.get('/track/:tid', function(req, res, next){
  const tid = req.params['tid'];
  console.log('retrieving track : ' + tid);

  /**
  needs to be updated
  */
  const trackSearchQuery = 'select * from Track';

  pool.getConnection(function(err, conn){
    if(err){
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(trackSearchQuery, function(error, results, fields){
      conn.release(); // done with the getConnection

      if(error) throw error;

      res.json(results);
    });
  });
});

module.exports = router;
