import React from 'react';
import './Track.css';

class Track extends React.Component {

  redirectToUrl(url){
    window.open(url, '_blank');
  }

  render(){
    return (
      <div className='track-container' onClick={() => this.redirectToUrl(this.props.track.trackUrl)}>
        <div className='row'>
          <div className='track-name col s5'>{this.props.track.trackName}</div>
          <div className='track-duration col s1'>{this.props.track.trackDuration}</div>
          <div className='track-artist col s3'>{this.props.track.trackArtist}</div>
          <div className='track-album col s3'>{this.props.track.trackAlbum}</div>
        </div>
      </div>
    );
  }
}

export default Track;
