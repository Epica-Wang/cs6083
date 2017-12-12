import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(){
    super();
    this.state = {
      // what states for the search bar?
      userKeyword: '',
      artistKeyword: '',
      trackKeyword: ''
    };
  }

  render(){
    return(
      <div class="nav-wrapper">
        <form>
          <div class="input-field">
            <input id="search" type="search" required />
            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
