import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import RoutesPrivate from './privateRoutes';

import Event from '../Pages/Event';
import Edit from '../Pages/Event/editEvent';
import Address from '../Pages/Address';
import Editar from '../Pages/Address/editAddress'; 
import Report from '../Pages/Report';
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

                    <RoutesPrivate exact path="/" render={Report} />
                    <RoutesPrivate exact path="/event" render={Event} />
                    <RoutesPrivate exact path="/event/:id" render={Edit} />
                    <RoutesPrivate exact path="/new-address/" render={Address} />
                    <RoutesPrivate exact path="/new-address/:cep" render={Address} />
                    <RoutesPrivate exact path="/address/:id" render={Editar} />

                    <Route path="/login">{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}</Route>
                    <Route path="/register">{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}</Route>

                    <Route path="*" component={Login} />

                </Switch>
            </Router>
        </div>

    )
}

export default App;
