import React from 'react';

const Input = (props) => {
  const { type } = props;
  let classPrefix;
  if (type === 'submit') classPrefix = 'pure-button pure-button-primary';
  return (
    <input className={classPrefix} {...props} />
  )
}

Input.propTypes = {
  type: React.PropTypes.oneOf(['text', 'number', 'submit']),
  title: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  placeholder: React.PropTypes.string,
};

export default Input;
