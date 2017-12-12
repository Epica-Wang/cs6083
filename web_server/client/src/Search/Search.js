import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      // what states for the search bar?
      userKeyword: '',
      artistKeyword: '',
      trackKeyword: '',
      searchResult: []
    };

    this.search = this.search.bind(this);
  }

  search(event){
    event.preventDefault();

    console.log('user clicked on search');
  }

  renderSearchResults(){

  }

  render(){
    return(
      <form className='searchForm' onSubmit={this.search}>
        <input id='searchKey' type="search" placeholder='Search'/>

        <input id='searchOptUser' type='radio' name='searchOpt' value='user' />
        <label for='searchOptUser'>User</label>
        <input id='searchOptArtist' type='radio' name='searchOpt' value='artist' />
        <label for='searchOptArtist'>Artist</label>
        <input id='searchOptTrack' type='radio' name='searchOpt' value='track' />
        <label for='searchOptTrack'>Track</label>
        <br/>
        <br/>
        <input id='submit' type='submit' name='searchButton' />
      </form>
    );
  }
}

export default Search;
