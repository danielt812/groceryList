import React from 'react';
import Option from '../Components/Option';
import './Setting.css';

const Setting = (props) => {
	return (
		<div className='setting-flex'>
			<label>{props.setting}: </label>
			<select onChange={props.onChange} value={props.optionState}>
				{props.options.map((child, i) => {
					return <Option key={i} value={child.value} label={child.label} />;
				})}
			</select>
		</div>
	);
};

export default Setting;
