import React from 'react';

const CheckboxOrRadio = (props) => (
	<div>
		{props.title}
		{props.options.map(option => {
			return (
			<label key={option} htmlFor={option} className="pure-checkbox">
				<input
					id={option}
					className={props.className}
					name={props.setName}
					onChange={props.onChange}
					value={option}
					checked={props.selectedOptions.indexOf(option) > -1}
					type={props.type}
				/> {option}
			</label>
			);
		})}
	</div>
);

CheckboxOrRadio.propTypes = {
	title: React.PropTypes.string,
	type: React.PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	selectedOptions: React.PropTypes.array,
	onChange: React.PropTypes.func.isRequired
};

export default CheckboxOrRadio;
