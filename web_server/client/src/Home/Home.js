import React from 'react';
import './Home.css';
import Auth from '../Auth/Auth';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      newsList: []
    };
  }

  componentDidMount(){
    this.setState( { username: Auth.getUsername() });
  }

  fetchNews(){
    
  }

  render(){
    return(
      <div className='home'>
        {this.state.username}
      </div>
    );
  };
}

export default Home;
