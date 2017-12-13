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
  const userPlaylistQuery = 'select userName,uCity,uEmail, pTitle from User natural join Playlist \
  where userName = ?';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userPlaylistQuery, un,function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

router.get('/:username/playlist/:playlistId', function(req, res, next){
  const un = req.params['username'];
  const pid = req.params['playlistId'];
  console.log('retrieving user ' + un + '\'s playlist ' + pid + '\'s tracks');

  /**
  needs to be updated
  */
  const userDisplayTrack = 'select tTitle from PlaylistTrack natural join Track \
  where pid = ?';

  pool.getConnection(function(err, conn){
    if(err){
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userDisplayTrack, pid, function(error, results, fields){
      conn.release(); // done with the getConnection

      if(error) throw error;

      res.json(results);
    });
  });
});


/**Like an Artist*/
router.get('/:username/like/:aid', function(req, res, next){
  const un = req.params['username'];
  const aid = req.params['aid'];
  console.log('inserting user ' + un + 'like Artist... ');

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
  console.log(CURRENT_TIMESTAMP)
  const userLikeArtistQuery = 'insert into LikeArtist values (?,?,?)';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userLikeArtistQuery,[un,aid,CURRENT_TIMESTAMP], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json("You now successfully like this artist:)");  // return result to client
    });
  });
});

/**Create a Playlist*/
router.get('/:username/createplaylist/:ptitle', function(req, res, next){
  const un = req.params['username'];
  const pTitle = req.params['ptitle'];
  console.log('creating user ' + un + 'new playlists' + pTitle);

  const userCreatePlaylist = 'insert into Playlist (`userName`, `pTitle`) values (?, ?)';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userCreatePlaylist,[un,pTitle], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json("You successfully create Playlist " + pTitle + "! Now add some tracks to it!");  // return result to client
    });
  });
});

/**Add a track to Playlist*/
router.get('/:username/playlist/:pid/addtrack/:tid', function(req, res, next){
  const un = req.params['username'];
  const pid = req.params['pid'];
  const tid = req.params['tid'];
  console.log('Add track ' + tid + ' toplaylists' + pid);

  const userAddTrackToPl = 'insert into PlaylistTrack values (?, ?)';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userAddTrackToPl,[pid,tid], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json("Successfully added!");  // return result to client
    });
  });
});

/**Follow other User*/
router.get('/:username/follow/:followingUserName', function(req, res, next){
  const un = req.params['username'];
  const followingUserName = req.params['followingUserName'];

  console.log(un + 'wants to follow' + followingUserName);

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
  console.log(CURRENT_TIMESTAMP)

  const userFollowOtherUser = 'insert into FollowUser values (?, ?, ?)';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userFollowOtherUser,[un,followingUserName,CURRENT_TIMESTAMP], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json("Successfully follow"+followingUserName);  // return result to client
    });
  });
});

/**Rate a track*/
router.get('/:username/track/:tid/rating/:rate', function(req, res, next){
  const un = req.params['username'];
  const tid = req.params['tid'];
  const rate = req.params['rate']

  console.log(un + 'gives rating to' + tid);

  var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };
  console.log(CURRENT_TIMESTAMP)

  const userRateATrack = 'insert into RateTrack values (?, ?, ?, ?)';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(userRateATrack,[un,tid,rate,CURRENT_TIMESTAMP], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json("Successfully store your rating!");  // return result to client
    });
  });
});

module.exports = router;
