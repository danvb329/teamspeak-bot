import React from 'react';
import LoginContainer from '/imports/ui/containers/LoginContainer';
import RegisterContainer from '/imports/ui/containers/RegisterContainer';

const TITLES_BY_PATH = {
  '/login': 'Login Page',
  '/register': 'Register Page',
};

const CONTAINER_BY_PATH = {
  '/login': <LoginContainer />,
  '/register': <RegisterContainer />
}

class AccessPage extends React.Component {
  render() {
    const { location } = this.props;
    const routePath = location.pathname;

    const containerWithProps = React.cloneElement(CONTAINER_BY_PATH[routePath], { routePath });

    return (
      <div className="access-page--container">
        <h3 className="title is-3 access-page--title">{TITLES_BY_PATH[routePath]}</h3>
        <div className="access-page--form-container">
          {containerWithProps}
        </div>
      </div>
    )
  }
};

export default AccessPage;
