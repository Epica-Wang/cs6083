import React from 'react';
import {Link} from 'react-router';
import './otherUser.css';
import Auth from '../Auth/Auth';
import Playlist from '../Playlist/Playlist';

class otherUser extends React.Component {
  constructor(){
    super();
    this.state = {
      myUserName:'',
      otherUserName: '',
      otherUserPlaylists: [],
      message: ''
    };
    this.follow = this.follow.bind(this);
  }

  componentDidMount(){
    this.setState({otherUserName: this.props.params.username});
    this.setState({myUserName: Auth.getUsername()});
    this.loadOtherUserPlaylists();
  }

  // this needs to be modified to retrieve from mysql using user's userName into the Playlist table
  loadOtherUserPlaylists(){
    // server side quer
    let url = 'http://localhost:3000/search/user/' + this.props.params.username;

    console.log(url);
    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    const otherUser = this.props.params.username;
    fetch(request)
      .then((response) => response.json())
      .then((hisPlaylists) => {
        this.setState({
          otherUserPlaylists: hisPlaylists
        });

        // console.log(hisPlaylists);
      })
      .catch(function(error){
        console.log(error);
      });

  }

  follow(){
    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/follow/' + this.props.params.username;

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((res) => {
        console.log(res + 'followed user');
        this.setState({
            message: 'You have successfully followed ' + this.props.params.username
        });
      })
      .catch(function(error){

        console.log(error);
      });
  }

  renderOtherUserPlaylists(){
    const hisPlaylists = this.state.otherUserPlaylists.map((hisPlaylists) => {
      return (
        <div className='list-group-item'>
          <Link to={'/user/playlist/'+ hisPlaylists.pid}>{hisPlaylists.pTitle}</Link>
        </div>
      );
    });

    return (
      <div className='container-fluid'>

        <div className='list-group'>
          {hisPlaylists}
        </div>
      </div>
    );
  }

  render(){
    if(this.state.otherUserPlaylists){
      return (
        <div className='otherUserProfile'>
          <div className='row'>
            <h6> You are viewing {this.state.otherUserName}'s playlists </h6>
            <a class="btn-floating btn-small waves-effect waves-light red" onClick={this.follow}><i class="material-icons">+</i></a>
          </div>
          <br/>
          <div>
              {this.renderOtherUserPlaylists()}
          </div>
          <div>{this.state.message}</div>
        </div>
      );
    }else{
      return(
        <div>
          This user has not created any playlist yet.
        </div>
      );
    }
  }
}

export default otherUser;
