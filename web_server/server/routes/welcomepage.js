var router = require('express').Router();
var pool = require('../config/mysql.js');


router.get('/home/:username', function(req, res, next){
  const username = req.params['username'];
  console.log('retrieving user matching ' + username);

  /**
  needs to be updated
  */
  const userHomePageQuery = 'select aname from LikeArtist natural join Artist natural join User where userName = ? ; \
  select followingUserName from FollowUser where userName = ? ;\
  select pTitle from User natural join Playlist where userName = ?';
  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userHomePageQuery,[[username],[username,username]], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});


module.exports = router;
