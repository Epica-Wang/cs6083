import React from 'react';
import {Link} from 'react-router';
import './Artist.css';
import Auth from '../Auth/Auth';
import Album from '../Album/Album';

/*
UserPlaylist maintains all the playlists belong to a particular user
*/
class Artist extends React.Component {
  constructor(){
    super();
    this.state = {
      aid: '', // this is grabbed from localStorage.
      artistAlbums: []
    };
  }

  componentDidMount(){
    this.setState({aid: this.props.params.aid});
    this.loadArtistAlbums();
  }

  // this needs to be modified to retrieve from mysql using user's userName into the Playlist table
  loadArtistAlbums(){
    // server side quer

    // server response hardcode
    this.setState({artistAlbums:[{
                                    aid: 3,
                                    abTitle: 'Fade',
                                    abDate: '2017-10-11'
                                  }]
                                });
  }

  renderArtistAlbums(){
    const albumList = this.state.artistAlbums.map((album) => {
      return (
        /*
          here i should NOT generate a Playlist component in the loop....
          should instead generate links!!!!!! then if user clicks on it. it should route to a different page.
          should look at the code to route between login and signup and base.

          DONE
        */
        <div className='list-group-item'>
          <Link to={'/album/' + album.aid}>{album.abTitle} ...{album.abDate}</Link>
        </div>
      );
    });

    return (
      <div className='container-fluid'>
        {/* <h6>{this.state.userPlaylists.playlistTitle}</h6> */}
        <div className='list-group'>
          {albumList}
        </div>
      </div>
    );
  }

  render(){
    if(this.state.artistAlbums){
      return (
        <div>
          <div className='artistProfile'>
            <div className='artist-albums'>
              {this.renderArtistAlbums()}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Artist;
