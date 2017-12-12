import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      // what states for the search bar?
      search: {
              searchOpt: '',
              searchVal: '',
      },
      searchResult: []
    };

    this.search = this.search.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }


  // this should send request to server.. and fetch the search result.... by grabbing the searchOpt and searchVal in the state...
  search(event){
    event.preventDefault();

    console.log('search value: ' + this.state.search.searchVal);
    console.log('search option: ' + this.state.search.searchOpt);
    // DO NOT call renderSearchResults here. call it in render()!!!.
  }

  changeSearch(event){
    const inputField = event.target.name;
    const inputVal = event.target.value;

    const search = this.state.search;
    search[inputField] = inputVal;

    this.setState({ search });
  }

  renderSearchResults(){
    if(this.state.searchResult){
      // render depending on this.state.search.searchOpt
      // if the returned result is User, render user


      // if the returned result is Artist, render artist


      // if the returned result is Track, render track...

    }else{
      return(
        <p>working or not?? </p>
      );
    }
  }

  render(){
    return(
      <div>
        <form className='searchForm' onSubmit={this.search}>
          <input id='searchKey' type="search" name='searchVal' onChange={this.changeSearch} placeholder='Search'/>

          <input id='searchOptUser' type='radio' name='searchOpt' value='user' onChange={this.changeSearch} />
          <label for='searchOptUser'>User</label>
          <input id='searchOptArtist' type='radio' name='searchOpt' value='artist' onChange={this.changeSearch} />
          <label for='searchOptArtist'>Artist</label>
          <input id='searchOptTrack' type='radio' name='searchOpt' value='track' onChange={this.changeSearch} />
          <label for='searchOptTrack'>Track</label>
          <br/>
          <br/>
          <input id='submit' type='submit' name='searchButton' />
        </form>
          {}
      </div>
    );
  }
}

export default Search;
