import React from 'react';
import './Track.css';
import Auth from '../Auth/Auth';

class Track extends React.Component {
  constructor(){
    super();
    this.state = {
      rating: {
        newRating: 0
      }
    };

    this.rateTrack = this.rateTrack.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }


  redirectToUrl(url){
    window.open(url, '_blank');
    console.log(this.props.playlistId);
    console.log(this.props.albumId);

    let reqUrl = '';
    if(this.props.playlistId){
      reqUrl = 'http://localhost:3000/track/' + this.props.track.tID + '/playlist/' + this.props.playlistId;
    }else if(this.props.albumId){
      reqUrl = 'http://localhost:3000/track/' + this.props.track.tID + '/album/' + this.props.albumId;
    }

    console.log(reqUrl);

    let request = new Request(encodeURI(reqUrl), {
      method: 'GET'
    });

    fetch(request)
      .then((response) => {
        console.log('incremented playcount by 1');
      });
  }


  rateTrack(event){
    event.preventDefault();
    // console.log(this.props.tid);
    // console.log(this.state.rating.newRating);
    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/track/' + this.props.tid + '/rating/' + this.state.rating.newRating;

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

  changeRating(event){
    const rating = this.state.rating;
    const inputField = event.target.name;

    rating[inputField] = event.target.value;
    this.setState(rating);
  }

  render(){
    return (
      <div className='track-container'>
        <div className='row'>
          <div className='track-duration col s1'>{this.props.track.tID}</div>
          <div className='track-name col s3' onClick={() => this.redirectToUrl(this.props.track.trackUrl)}>{this.props.track.tTitle}</div>
          <div className='track-artist col s3'>{this.props.track.tDuration}</div>
          <div className='track-album col s3'>{this.props.track.tGenre}</div>
          <form className='col s2' onChange={this.changeRating} onSubmit={this.rateTrack}>
            <input className='col s12' type="number" id="rating" name="newRating" min="1" max="5" requied/>
            <input type="submit" name="ratingButton" value="Rate" />
          </form>
        </div>
      </div>
    );
  }
}

export default Track;
