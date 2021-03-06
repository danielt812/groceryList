import React from 'react';
import './Item.css';

const Item = (props) => {
	return (
		<div className='item' id={props.id}>
			<div className='item-component'>
				<h2
					className={props.active ? 'item-title line-through' : 'item-title'}
					onClick={props.setActive}
				>
					{props.name}
				</h2>
				<div className='btn' onClick={props.deleteItem}>
					<i className='fas fa-trash-alt'></i>
				</div>
			</div>
		</div>
	);
};

export default Item;
