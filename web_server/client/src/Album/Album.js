import React from 'react';
import './Album.css';

import Track from '../Track/Track';
import Auth from '../Auth/Auth';

/*
Playlist maintains all the tracks within the playlist
*/
class Album extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      albumId: 0,
      tracks: []
    };
  }

  componentDidMount(){
    this.loadTracks();
  }

  // contact server to retrieve a particular user's playlists.
  loadTracks(){
    // console.log('loading tracks. getting param playlistId: ' + this.props.params.playlistId); // for testing.
    this.setState({albumId: this.props.params.abId});
    let url = 'http://localhost:3000/search/album/' + this.props.params.abId;
    console.log(url);

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((albumTracks) => {
        this.setState({
          tracks: albumTracks
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
          <Track track={tr} albumId={this.state.albumId}/>
        </a>
      );
    });

    return (
      <div className='container-fluid album-container'>
        <h6>Tracks for {}:</h6>
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
          This album is empty
        </div>
      );
    }
  }
}

export default Album;
