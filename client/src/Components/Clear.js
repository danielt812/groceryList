import React from 'react';
import './Clear.css';

const Clear = (props) => {
	return (
		<div onClick={props.clearAll} className='button-flex'>
			<div className='button'>Clear</div>
		</div>
	);
};

export default Clear;
