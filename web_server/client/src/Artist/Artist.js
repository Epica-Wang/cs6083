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
      aid: '',
      aname: '',
      aDesc: '',
      artistAlbums: [],
      message: ''
    };
    this.likeArtist = this.likeArtist.bind(this);
  }

  componentDidMount(){
    this.setState({aid: this.props.params.aid});
    this.loadArtistAlbums();
  }

  // this needs to be modified to retrieve from mysql using user's userName into the Playlist table
  loadArtistAlbums(){

    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/artist/' + this.props.params.aid;  // artist id
    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((artistAlbums) => {
        console.log(artistAlbums);
        this.setState({
          aname: artistAlbums[0]['aName'],
          aDesc: artistAlbums[0]['aDesc'],
          artistAlbums: artistAlbums
        });

      })
      .catch(function(error){
        console.log(error);
      });
  }

  likeArtist(){
    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/like/' + this.props.params.aid;

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
      .then((res) => {

        this.setState({
            message: res
        });

      })
      .catch(function(error){

        console.log(error);
      });
  }

  renderArtistAlbums(){
    const albumList = this.state.artistAlbums.map((album) => {
      const ab = album;
      return (
        <div className='list-group-item'>
          Album {album.abID}: <Link to={'/album/' + ab.abID} album={ab}>{album.abTitle} ... {album.abDate}</Link>
        </div>
      );
    });

    return (
      <div className='container-fluid'>
        <h5>{this.state.aname} </h5>
        <h6>{this.state.aDesc} </h6>
        <div className='list-group'>
          <br/>
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
            <h6> You are viewing {this.state.aname}'s albums </h6><br/>
            <a class="btn-floating btn-small waves-effect waves-light red" onClick={this.likeArtist}><i class="material-icons">+</i></a>
            <br/>
            <div className='artist-albums'>
              {this.renderArtistAlbums()}
            </div>
            <br/>
            <div>{this.state.message}</div>
          </div>
        </div>
      );
    }
  }
}

export default Artist;
