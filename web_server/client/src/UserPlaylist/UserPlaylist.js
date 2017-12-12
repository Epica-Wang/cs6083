import React from 'react';
import {Link} from 'react-router';
import './UserPlaylist.css';
import Auth from '../Auth/Auth';
import Playlist from '../Playlist/Playlist';

/*
UserPlaylist maintains all the playlists belong to a particular user
*/
class UserPlaylist extends React.Component {
  constructor(){
    super();
    this.state = {
      userName: '', // this is grabbed from localStorage.
      userPlaylists: []
    };
  }

  componentDidMount(){
    this.setState({userName: Auth.getUsername()});
    this.loadUserPlaylists();
  }

  // this needs to be modified to retrieve from mysql using user's userName into the Playlist table
  loadUserPlaylists(){
    // server side quer

    // server response hardcode
    this.setState({userPlaylists:[{
                                    playlistId: 1,
                                    playlistTitle: 'taeyang favorite',
                                    pCreateDate: '11-29-2017'
                                  },
                                  {
                                    playlistId: 2,
                                    playlistTitle: 'taeyang favorite 7777',
                                    pCreateDate: '5-19-2017'
                                  }]
                                });
  }

  renderPlaylists(){
    const playlists = this.state.userPlaylists.map((playlist) => {
      return (
        /*
          here i should NOT generate a Playlist component in the loop....
          should instead generate links!!!!!! then if user clicks on it. it should route to a different page.
          should look at the code to route between login and signup and base.

          DONE
        */
        <div className='list-group-item'>
          <Link to={'/user/playlist/' + playlist.playlistId}>{playlist.playlistTitle} ...{playlist.pCreateDate}</Link>
        </div>
      );
    });

    return (
      <div className='container-fluid'>
        <h6>{this.state.userPlaylists.playlistTitle}</h6>
        <div className='list-group'>
          {playlists}
        </div>
      </div>
    );
  }

  render(){
    if(this.state.userPlaylists){
      return (
        <div>
          <div className='userProfile'>
            <h6 className='user-greeting'>Hello {this.state.userName}! Here are your playlists:</h6>
            <div className='user-playlists'>{this.renderPlaylists()}</div>
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <div>
            <div className='user-greeting'>Hello {this.state.userName}. You do not have any playlists. Please create one!</div>
          </div>
        </div>
      );
    }
  }
}

export default UserPlaylist;
