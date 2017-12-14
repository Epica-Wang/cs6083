import React from 'react';
import './Home.css';
import Auth from '../Auth/Auth';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      newsList: {
        followingUserList: [],
        likeArtistList:[],
        playlistsCreated:[]
      }
    };
  }

  componentDidMount(){
      this.setState( { username: Auth.getUsername() });
      this.loadNews();
  }

  loadNews(){
    let url = 'http://localhost:3000/home/' + Auth.getUsername();

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((newlist) => {
        const newsList = this.state.newsList;
        newsList['likeArtistList'] = newlist[0];
        newsList['followingUserList'] = newlist[1];
        newsList['playlistsCreated'] = newlist[2];

        this.setState({
          newsList: newsList
        });
      })
      .catch(function(error){
        console.log(error);
      });
  }

  renderNewsList(){
      const artistList = this.state.newsList.likeArtistList.map((artist) => {
        const art = artist;
        return (
          <div className='list-group-item'>
            Artist: <Link to={'/artist/' + artist.aid}>{artist.aname}</Link>
          </div>
        );
      });

      const followerList = this.state.newsList.followingUserList.map((follower) => {
        const user = follower;
        return (
          <div className='list-group-item'>
            Following: <Link to={'/user/' + follower.followingUserName}>{follower.followingUserName}</Link>
          </div>
        );
      });

      const playlistList = this.state.newsList.playlistsCreated.map((pl) => {
        // const plist = pl;
        return (
          <div className='list-group-item'>
            Playlist: <Link to={'/user/playlist/' + pl.pid}>{pl.pTitle}</Link>
          </div>
        );
      });

      return(
        <div className='container-fluid'>
          {artistList}
          <br/>
          {followerList}
          <br/>
          {playlistList}
          <br/>
        </div>
      );
  }

  render(){
    // console.log(this.state.newsList.followingUserList);
    return(
      <div className='home'>
        {this.renderNewsList()}
      </div>
    );
  };
}

export default Home;
