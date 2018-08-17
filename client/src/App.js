import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import WelcomeScreen from './components/welcome_screen';
import AddressScreen from './components/address_screen';
import ZestimateScreen from './containers/zestimation_screen';
import History from './containers/history';
import { BrowserRouter } from 'react-router-dom';
import ProgressBar from './containers/progress_bar';
import './App.css';


export default class App extends Component {
  render() {
    const username = localStorage.getItem('username');
    return (
        <BrowserRouter>
          <div>
            <div className='header'>
              <span>{`Welcome, ${username ? username : 'Guest'}`}</span>
              <h1>Rent With Me</h1>
              <h3>The #1 home rental platform in the world!</h3>
            </div>
            <div className='main_content'>
              <div className='instructions'>
                <Switch>
                    <Route exact path="/" component={WelcomeScreen} />
                    <Route exact path="/address" component={AddressScreen} />
                    <Route exact path="/zestimate" component={ZestimateScreen} />
                </Switch>
              </div>
              <div className='history'>
                <History/>
              </div>
            </div>
            <div className='progress_bar'>
              <ProgressBar/>
            </div>
          </div>
        </BrowserRouter>
    )
  }
};