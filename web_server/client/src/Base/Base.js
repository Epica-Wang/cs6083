import React from 'react';
import {Link} from 'react-router';
import Auth from '../Auth/Auth';
import './Base.css';

const Base = ({children}) => (
  <div>
    <nav className="nav-bar indigo">
        <div className="nav-wrapper">
        {/* <a href="/" className="brand-logo center"> CS6083 Music </a> */}
        <ul id="nav-mobile" className="left hide-on-small-and-down">
          {
            Auth.isAuthenticated() ?
            (
              <div>
                <div>
                  <li><Link to='/home'>Home</Link></li>
                  <li><Link to='/user'>{Auth.getUsername()}</Link></li>
                  <li><Link to='/logout'>Log out</Link></li>
                </div>

                <form>
                  <input id='searchKey' type="search" placeholder='Search'/>
                  <input id='searchOptUser' type='radio' name='searchOpt' value='user' />
                  <label for='searchOptUser'>User</label>
                  <input id='searchOptArtist' type='radio' name='searchOpt' value='artist' />
                  <label for='searchOptArtist'>Artist</label>
                  <input id='searchOptTrack' type='radio' name='searchOpt' value='track' />
                  <label for='searchOptTrack'>Track</label>
                </form>
              </div>
            )
            :
            (
              <div>
                <li><Link to='/login'>Log in</Link></li>
                <li><Link to='/signup'>Sign up</Link></li>
              </div>
            )
          }
        </ul>

        </div>

    </nav>
    <br/>
    {children}
  </div>
);

export default Base;
