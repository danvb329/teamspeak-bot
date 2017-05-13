import React from 'react';

class FormErrors extends React.Component {
  render() {
    const { errors } = this.props;
    return (
      <div>
        <ul className="menu-list">
          { errors.length > 0 && errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }
};

export default FormErrors;
