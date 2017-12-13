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
          <div className='track-name col s5'>{this.props.track.tTitle}</div>
          <div className='track-duration col s1'>{this.props.track.tID}</div>
          <div className='track-artist col s3'>{this.props.track.tDuration}</div>
          <div className='track-album col s3'>{this.props.track.tGenre}</div>
        </div>
      </div>
    );
  }
}

export default Track;
