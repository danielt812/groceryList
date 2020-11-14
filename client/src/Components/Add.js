import React from 'react';
import './Add.css';

const Add = (props) => {
	return (
		<div className='add'>
			<div className='add-component'>
				<input type='text' value={props.value} onChange={props.newItemValue} />
				<div className='btn' onClick={props.addItem}>
					<i className='fas fa-cart-plus'></i>
				</div>
			</div>
		</div>
	);
};

export default Add;
