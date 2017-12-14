var router = require('express').Router();
var pool = require('../config/mysql.js');

router.get('/artist/:aname', function(req, res, next){
  const aname = req.params['aname'];
  console.log('retrieving artists matching ' + aname);

  /**
  needs to be updated
  */
  const artistSearchQuery = 'select aid, aname, abTitle from Artist natural join ArtistAlbum natural join Album where aname like ?';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(artistSearchQuery, '%'+aname+'%', function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying
      // console.log(results);
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
  const userSearchQuery = 'select userName, pid, pTitle from User natural left join Playlist where username like ?';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userSearchQuery, '%'+username+'%', function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

router.get('/track/:tTitle', function(req, res, next){
  const tTitle = req.params['tTitle'];
  console.log('retrieving track : ' + tTitle);

  /**
  needs to be updated
  */
  const trackSearchQuery = 'select * from Track where tTitle like ?';

  pool.getConnection(function(err, conn){
    if(err){
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(trackSearchQuery, '%'+tTitle+'%', function(error, results, fields){
      conn.release(); // done with the getConnection

      if(error) throw error;

      res.json(results);
    });
  });
});

router.get('/album/:abId', function(req, res, next){
  const abId = req.params['abId'];
  console.log('retrieving tracks in album : ' + abId);

  const albumTrackQuery = 'select * from TrackAlbum natural join Album natural join Track where abId = ?';

  pool.getConnection(function(err, conn){
    if(err){
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(albumTrackQuery, abId, function(error, results, fields){
      conn.release(); // done with the getConnection
      if(error) throw error;
      res.json(results);
    });
  });

});

module.exports = router;
