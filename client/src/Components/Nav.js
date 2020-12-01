import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
	return (
		<nav className='nav-background'>
			<div className='nav-flex'>
				<div className='nav-links'>
					<NavLink exact to='/'>
						<i className='fa fa-fw fa-home'></i> Home
					</NavLink>
					<NavLink exact to='/settings'>
						<i className='fa fa-fw fa-cog'></i> Settings
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
