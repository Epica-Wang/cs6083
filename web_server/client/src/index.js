import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {browserHistory, Router} from 'react-router';
import routes from './routes';


// for testing
import App from './App/App';
import Playlist from './Playlist/Playlist.js';
import UserPlaylist from './UserPlaylist/UserPlaylist';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
);
