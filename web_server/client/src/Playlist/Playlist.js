import React from 'react';
import './Playlist.css';

import Track from '../Track/Track';
import Auth from '../Auth/Auth';

/*
Playlist maintains all the tracks within the playlist
*/
class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistId: 0,
      tracks: []
    };
  }

  componentDidMount(){
    this.loadTracks();
  }

  // contact server to retrieve a particular user's playlists.
  loadTracks(){
    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/playlist/' + this.props.params.playlistId;
    this.setState({playlistId: this.props.params.playlistId});
    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((playlistTracks) => {
        // console.log(playlistTracks);
        this.setState({
          tracks: playlistTracks
        });
      })
      .catch(function(error){
        console.log(error);
      });
  }

  renderTracks(){
    const tracksList = this.state.tracks.map((track) => {
      const tr= track;
      if(!tr.url){
        tr['trackUrl'] = 'https://www.youtube.com';
      }
      // console.log(track);
      return (
        <a className='list-group-item'>
          <Track track={tr} playlistId={this.state.playlistId} />
        </a>
      );
    });

    return (
      <div className='container-fluid playlist-container'>
        <h6>Tracks for Playlist {this.state.playlistId}:</h6>
        <br/>
        <div className='list-group'>
          {tracksList}
        </div>
      </div>
    );
  }

  render(){
    if(this.state.tracks){
      return(
        <div>
          {this.renderTracks()}
        </div>
      );
    }else{
      return(
        <div>
          This playlist is empty. Search and add tracks...
        </div>
      );
    }
  }
}

export default Playlist;
