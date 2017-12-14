var express = require('express');
var router = express.Router();
var pool = require('../config/mysql.js');

router.get('/:tid/playlist/:plId', function(req, res, next){
  const tid = req.params['tid'];
  const plId = req.params['plId'];

  const trackPlaylistCountQuery = 'Update Track Set tPlayCount = tPlayCount + 1 where tID = ?; \
                                  Update Playlist Set pPlayCount = pPlayCount + 1 where pid = ?;';

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(trackPlaylistCountQuery, [[tid], [plId]], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

router.get('/:tid/album/:abId', function(req, res, next){
  const tid = req.params['tid'];
  const abId = req.params['abId'];

  console.log(req.url);

  const trackAlbumCountQuery = "Update Track Set tPlayCount = tPlayCount + 1 where tID = ?; \
                                Update Album Set abPlayCount = abPlayCount + 1 where abID = ?;";

  pool.getConnection(function(err, conn){
    if(err){  // error getting a connection
      console.log('Failed to obtain mysql connection from pool ' + err);
    }

    conn.query(trackAlbumCountQuery, [tid, abId], function(error, results, fields){
      conn.release(); // done with the connection

      if(error) throw error;  // error querying

      res.json(results);  // return result to client
    });
  });
});

module.exports = router;
