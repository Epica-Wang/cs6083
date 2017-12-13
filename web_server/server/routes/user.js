var express = require('express');
var router = express.Router();
var pool = require('../config/mysql.js');

/**Get user's playlists*/
router.get('/:username', function(req, res, next){
  const un = req.params['username'];
  console.log('retrieving user ' + un + '\'s playlists... ');

  /**
  needs to be updated
  */
  const userPlaylistQuery = 'select * from User';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userPlaylistQuery, function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

module.exports = router;
