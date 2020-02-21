import React, { Component } from 'react';
import api from './services/api'

class App extends Component{

  async componentDidMount(){
    const result = await api.call('post', 'auth/login', {
      email: "hey@gmail.com",
      password: "hey"
    });
    console.log(result);
  }

  render(){
    return(
      <div>App works</div>
    )
  }
}

export default App;
