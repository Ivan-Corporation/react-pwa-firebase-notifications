import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap'
import Home from './Home'
import About from './About'
import Users from './Users'

import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { fetchToken, onMessageListener } from './firebase';

function App() {

	const [show, setShow] = useState(false);
	const [notification, setNotification] = useState({ title: '', body: '' });
	const [isTokenFound, setTokenFound] = useState(false);
	fetchToken(setTokenFound);

	onMessageListener().then(payload => {
		setNotification({ title: payload.notification.title, body: payload.notification.body })
		setShow(true);
		console.log(payload);
	}).catch(err => console.log('failed: ', err));

	const onShowNotificationClicked = () => {
		setNotification({ title: "Notification", body: "This is a test notification" })
		setShow(true);
	}


	return (
		<div className="App">
			<Router>
				<Navbar bg="primary" variant="dark">
					{
						isTokenFound &&
						'Notification permission enabled 👍🏻'
					}
					{
						!isTokenFound &&
						'Need notification permission ❗️'
					}
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link ><Link to="/">Home</Link></Nav.Link>
						<Nav.Link ><Link to="/about" >About</Link></Nav.Link>
						<Nav.Link><Link to="/users">Users</Link></Nav.Link>
					</Nav>
				</Navbar>
				<Switch>
					<Route path="/about" component={About} ></Route>
					<Route path="/users" component={Users} ></Route>
					<Route path="/" component={Home} ></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
