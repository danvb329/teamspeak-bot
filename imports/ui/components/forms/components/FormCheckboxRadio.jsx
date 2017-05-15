import React from 'react';

class FormCheckboxRadio extends React.Component {
	render() {
		const {
			type,
			title,
			options,
			setName,
			onChange,
			className,
			selectedOptions,
		} = this.props;

		return (
			<div>
				{title}
				{options.map(option => {
					return (
					<label key={option}>
						<input
							id={option}
							className={className}
							name={setName}
							onChange={onChange}
							value={option}
							checked={selectedOptions.indexOf(option) > -1}
							type={type}
						/> {option}
					</label>
					);
				})}
			</div>
		)
	}
};

export default FormCheckboxRadio;
