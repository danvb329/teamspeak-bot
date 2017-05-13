import React from 'react';

const Button = (props) => (
  <button
    className={props.className ? props.className : 'pure-button'}
    type={props.type}
    title={props.title}
    name={props.name}
    onClick={props.onClick}
  > {props.buttonText} </button>
);

Button.propTypes = {
  type: React.PropTypes.oneOf(['button', 'submit']),
  title: React.PropTypes.string,
  name: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Button;
