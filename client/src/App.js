import React from 'react';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import Nav from './Components/Nav';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/settings' component={Settings} />
				</Switch>
			</div>
		</Router>
	);
}
