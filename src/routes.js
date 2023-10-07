import React from 'react';
import {Route} from 'react-router-dom';

import App from "./App";
import Home from "./components/home";
import DotaBlog from "./components/dotablog";

export default (
    <Route path="/" component={App}>
        <Route path="home" component={Home}/>
        <Route path="dota" component={DotaBlog}/>
    </Route>
)