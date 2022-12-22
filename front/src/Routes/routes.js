import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';




axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
const token = localStorage.getItem('auth_token');
config.headers.Authorization = token ? `Bearer ${token}` : '';
return config;
});



function App() {
    return (
        <div>
            <Router>
                <Switch>

                <Route path= "/" render={Home}/>
    
                <Route path="/login">{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}</Route>
                <Route path="/register">{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}</Route>
                
                
    
                </Switch>
            </Router>
        </div>
    
    )
    }
    
    export default App;
