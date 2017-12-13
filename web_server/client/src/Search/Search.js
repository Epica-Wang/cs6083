import React from 'react';
import Auth from '../Auth/Auth';
import './Search.css';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      search: {
              searchOpt: '',
              searchVal: '',
      },
      searchResult: []
    };

    this.search = this.search.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }

  // Generate http request to retrieve search results from server.
  search(event){
    event.preventDefault();

    const searchVal = this.state.search.searchVal;
    const searchOpt = this.state.search.searchOpt;

    console.log('search value: ' + this.state.search.searchVal);
    console.log('search option: ' + this.state.search.searchOpt);

    let url = 'http://localhost:3000/search/' + searchOpt + '/' + searchVal;
    // console.log('this is the url: ' + url);  // for testing.

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
        'Authorization': 'bear ' + Auth.getUsername()
      },
      cache: false
    });

    fetch(request)
      .then((response) => response.json())
      .then((searchRes) => {
        this.setState({
          searchResult: searchRes
        });
      });
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
      /**
      needs to be updated.
      */
      const searchResList = this.state.searchResult.map((res) => {
        if(this.state.search.searchOpt === 'user'){
          return (
            <div>
              <a className='list-group-item'>
                {res.userName}, {res.uFirstName}, {res.uLastName}, {res.uCity}, {res.uEmail}
              </a>
            <br/>
            </div>
          );
        }else if(this.state.search.searchOpt === 'artist'){
          return (
            <div>
              <a className='list-group-item'>
                artist....
              </a>
            </div>
          );
        }else{
          return (
            <div>
              <a className='list-group-item'>
                track...
              </a>
            <br/>
            </div>
          );
        }

      });

      return(
        <div className='container-fluid' key='userName'>
          <div className='list-group'>
            {searchResList}
          </div>
        </div>
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

        <div className='searchResult'>
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

export default Search;
