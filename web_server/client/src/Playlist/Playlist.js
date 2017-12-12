import React from 'react';
import './Playlist.css';

import Track from '../Track/Track';

/*
Playlist maintains all the tracks within the playlist
*/
class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistId: 0,
      tracks: null
    };
  }

  componentDidMount(){
    this.loadTracks();
  }

  // should later change to get data through mysql using the passed in playlist and userName from localStorage
  loadTracks(){
    console.log('loading tracks. getting param playlistId: ' + this.props.params.playlistId);
    // this.setState({ playlistId: this.props.params.playlistId });
    // console.log('not sure if it\'ll be used:. but whaterver.....' + this.state.playlistId);

    // const req = 'http://localhost:3000/user/' + localStorage.getItem('username') + '/playlist/' + this.state.playlistId;
    // console.log(req);
    //
    // // contact server. server will return query result.
    // fetch(req, {}).then(function(response){
    //   //  parse response to get result.
    //   // setState
    //
    // }).catch(function(error){
    //   console.log(error);
    // });

    this.setState({tracks: [{
                          trackName: "Hello",
                          trackDuration: 295493,
                          trackArtist: "Adele",
                          trackAlbum: "me love adele",
                          trackUrl: 'https://www.youtube.com'
                        },
                        {
                          trackName: 'Send My Love (To Your New Lover)',
                          trackDuration: 223080,
                          trackArtist: 'Adele',
                          trackAlbum: 'me love adele 2',
                          trackUrl: 'https://www.youtube.com'
                        }]
                    });
  }

  renderTracks(){
    const tracksList = this.state.tracks.map((track) => {
      return (
        <a className='list-group-item'>
          <Track track={track} />
        </a>
      );
    });

    return (
      <div className='container-fluid'>
        <h6>{this.state.playlistId}</h6>
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
