import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import './App.css';

//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to Music App</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

/*
  testing
*/
import Home from '../Home/Home';

class App extends Component {
  render(){
    return(
      <p>something</p>
      // <Router history={browserHistory}>
      //
      //     <Route path='home' component={Home}></Route>
      //     <Route path='user' component={User}></Route>
      //
      //
      // </Router>
    );
  };
}

export default App;
