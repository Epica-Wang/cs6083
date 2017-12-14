import React from 'react';
import Auth from '../Auth/Auth';
import Track from '../Track/Track';
import {Link} from 'react-router';
import './Search.css';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      search: {
              searchOpt: '',
              searchVal: '',
      },
      searchResult: [],
      selectedPlaylist: {
        pid: 0,
        tid: 0
      }
    };

    this.search = this.search.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.updateSelectedPlaylist = this.updateSelectedPlaylist.bind(this);
  }

  // Generate http request to retrieve search results from server.
  search(event){
    event.preventDefault();

    const searchVal = this.state.search.searchVal;
    const searchOpt = this.state.search.searchOpt;

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

  addToPlaylist(event){
    event.preventDefault();

    // console.log(this.state.selectedPlaylist.pid);
    // console.log(this.state.selectedPlaylist.tid);
    const pid = this.state.selectedPlaylist.pid;
    const tid = this.state.selectedPlaylist.tid;

    let url = 'http://localhost:3000/user/' + Auth.getUsername() + '/playlist/' + pid + '/addtrack/' + tid;
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
        console.log('added track to playlist');
      })
      .catch(function(error){
        console.log(error);
      });
  }

  updateSelectedPlaylist(event){
    const inputField = event.target.name;
    const selectedPlaylist = this.state.selectedPlaylist;
    selectedPlaylist[inputField] = event.target.value

    this.setState({selectedPlaylist});
    // console.log(this.state.selectedPlaylist.pid);
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
              <Link to={'/user/' + res.userName} className='list-group-item'>
                {res.userName}, {res.pid}, {res.pTitle}
              </Link>
            <br/>
            </div>
          );
        }else if(this.state.search.searchOpt === 'artist'){
          return (
            <div>
              <Link to={'/artist/' + res.aid} className='list-group-item'>
                {res.aname}, {res.abTitle}
              </Link>
            </div>
          );
        }else{
          if(!res.url){
            res['trackUrl'] = 'http://www.youtube.com';
          }
          return (
            <div>
              <a className='list-group-item row'>
                <Track className='col s11' track={res} tid={res.tID}/>
              </a>
            </div>
          );
        }
      });

      return(
        <div className='container-fluid' key='userName'>
          <label>Here are your search results: </label><br/><br/>

          <form onSubmit={this.addToPlaylist} onChange={this.updateSelectedPlaylist}>

            <div className='list-group'>
                {searchResList}
            </div>

            {
              (this.state.search.searchOpt === 'track' && this.state.searchResult.length > 0) ?

              <div class="input-field col s12 row">
                <div className='input-field col s6'>
                  <input className='selectedPlaylist' placeholder='Playlist ID' name='pid' type='number' required />
                </div>
                <div className='input-field col s6'>
                  <input className='selectedTrack input-field col s6' placeholder='Track ID' name='tid' type='number' required />
                </div>
                <br/>
                {/* <p>Add to playlist: not working as planned due to a bug that my version of chrome does not allow select tag</p> */}
                <br/>
                <input type='submit' value='Save to Playlist'/>
              </div>

              :
              <div></div>
            }


          </form>
        </div>
      );
    }
  }

  render(){
    return(
      <div>
        <form className='searchForm' onSubmit={this.search}>
          <input id='searchKey' type="search" name='searchVal' onChange={this.changeSearch} placeholder='Search' required />

          <input id='searchOptUser' type='radio' name='searchOpt' value='user' onChange={this.changeSearch} />
          <label htmlFor='searchOptUser'>User</label>
          <input id='searchOptArtist' type='radio' name='searchOpt' value='artist' onChange={this.changeSearch} />
          <label htmlFor='searchOptArtist'>Artist</label>
          <input id='searchOptTrack' type='radio' name='searchOpt' value='track' onChange={this.changeSearch} />
          <label htmlFor='searchOptTrack'>Track</label>
          <br/>
          <br/>
          <input id='submit' type='submit' value='Search' name='searchButton' />
        </form>

        <div className='searchResult'>
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

export default Search;
