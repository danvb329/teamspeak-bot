import React from 'react';

class FormLabel extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <label className="label">{text}</label>
    )
  }
};

export default FormLabel;
