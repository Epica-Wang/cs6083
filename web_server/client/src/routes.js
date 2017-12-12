// import App from './App/App';
import Auth from './Auth/Auth';
import Base from './Base/Base';
import Home from './Home/Home';
import Playlist from './Playlist/Playlist';
import UserPlaylist from './UserPlaylist/UserPlaylist';
import SignupPage from './Signup/SignupPage';
import LoginPage from './Login/LoginPage';
import SearchBar from './SearchBar/SearchBar';

const routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',  // this should be Auth
      getComponent: (location, callback) => {
        if(Auth.isAuthenticated()){
          callback(null, Home);
        }else{
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/home',
      getComponent: (location, callback) => {
        if(Auth.isAuthenticated()){
          callback(null, Home);
        }else{
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/user',
      getComponent: (location, callback) => {
        if(Auth.isAuthenticated()){
          callback(null, UserPlaylist);
        }else{
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/search',
      getComponent: (location, callback) => {
        if(Auth.isAuthenticated()){
          callback(null, SearchBar);  // this needs to be thought through.
        }else{
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/user/playlist/:playlistId',
      getComponent: (location, callback) => {
        if(Auth.isAuthenticated()){
          callback(null, Playlist);
        }else{
          callback(null, LoginPage);
        }
      }
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '/logout',
      onEnter: (nextStage, replace) => {
        Auth.deauthenticateUser();  // currently disabled for testing
        replace('/login');
      }
    }
  ]
};

export default routes;
