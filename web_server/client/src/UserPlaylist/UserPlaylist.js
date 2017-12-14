import React from 'react';
import { Link } from 'react-router';
import './UserPlaylist.css';
import Auth from '../Auth/Auth';

/*
UserPlaylist maintains all the playlists belong to a particular user
*/
class UserPlaylist extends React.Component {
  constructor(){
    super();
    this.state = {
      userName: '', // this is grabbed from localStorage.
      userPlaylists: [],
      userPlaylistCount: 0,
      pTitle: {
        newTitle: ''
      }
    };

    this.changePlaylistTitle = this.changePlaylistTitle.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  componentDidMount(){
    this.setState({userName: Auth.getUsername()});
    this.loadUserPlaylists();
  }

  changePlaylistTitle(event){
    event.preventDefault();

    const pTitle = this.state.pTitle;
    const inputField = event.target.name;

    pTitle[inputField] = event.target.value;
    this.setState({pTitle});
    // console.log(this.state.pTitle);
  }

  createPlaylist(event){
    event.preventDefault();
    // console.log('creating a new playlist title : ' +  this.state.pTitle.newTitle);


    const newTitle = this.state.pTitle.newTitle;

    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/createplaylist/' + newTitle;
    // console.log(url);

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
        console.log('created a new playlist');
      })
      .catch(function(error){
        console.log(error);
      });
  }

  loadUserPlaylists(){

    let url = 'http://localhost:3000/user/' + Auth.getUsername();
    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((userPlaylists) => {
        // console.log(userPlaylists);
        this.setState({
          userPlaylistCount: userPlaylists.length,
          userPlaylists: userPlaylists
        });
      })
      .catch(function(error){
        console.log(error);
      });
  }

  renderPlaylists(){
    const playlists = this.state.userPlaylists.map((playlist) => {
      return (
        <div className='list-group-item'>
          <Link to={'/user/playlist/' + playlist.pid}>{playlist.pid} {playlist.pTitle}</Link>
        </div>
      );
    });

    return (
      <div className='container-fluid'>
        <h6>{this.state.userPlaylists.playlistTitle}</h6>
        <div className='list-group'>
          <br/>
          {playlists}
        </div>
      </div>
    );
  }

  render(){
    if(this.state.userPlaylists){
      return (
        <div className='userProfile'>
          <div>
            <h6 className='user-greeting'>Hello {this.state.userName}! You currently have {this.state.userPlaylistCount} playlists:</h6>
            <div>{this.renderPlaylists()}</div>
          </div>
          <br/>
          <br/>
          <form onSubmit={this.createPlaylist} onChange={this.changePlaylistTitle}>

            <div className="input-field col s10">
              <input className='title' placeholder='Title' name='newTitle' type='text' required />
              <label forHtml="title">Create a new playlist: </label>
            </div>
            <div className="input-field col s2">
              <input id="" type="submit" value='Create new' class="validate" />
            </div>

          </form>
        </div>
      );
    }else{
      return (
        <div>
          <div>
            <div className='user-greeting'>Hello {this.state.userName}. You do not have any playlists. Please create one!</div>
          </div>
          <br/>
          <form onSubmit={this.createPlaylist} onChange={this.changePlaylistTitle}>
            <div className="input-field col s10">
              <input className='title' name='newTitle' type='text' required />
              <label forHtml="title">Create a new playlist: </label>
            </div>
            <div className="input-field col s2">
              <input id="" type="submit" class="validate" />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default UserPlaylist;
