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
    // console.log('loading tracks. getting param playlistId: ' + this.props.params.playlistId); // for testing.
    this.setState({ playlistId: this.props.params.playlistId });

    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/playlist/' + this.props.params.playlistId;

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

      return (
        <a className='list-group-item'>
          <Track track={tr} />
        </a>
      );
    });

    return (
      <div className='container-fluid playlist-container'>
        <h5>Tracks for Playlist {this.state.playlistId}:</h5>
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
