import React from 'react';

const Option = (props) => {
	return (
		<option value={props.value} onChange={props.handleChange}>
			{props.label}
		</option>
	);
};

export default Option;
