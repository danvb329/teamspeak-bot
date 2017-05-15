import React from 'react';
import { compose } from 'react-komposer';
import { browserHistory } from 'react-router';
import Footer from '/imports/ui/components/shared/Footer';
import Loader from '/imports/ui/components/shared/Loader';
import Navbar from '/imports/ui/components/shared/Navbar';
import trackerComposer from '/imports/ui/composers/tracker';

const requireAuth = [
  'clients',
  '/clients',
  'client',
];

class MasterLayout extends React.Component {
  checkRedirect() {
    const { user, location, loggingIn } = this.props;
    const routePath = location.pathname;
    const redirectIfNoAuth = requireAuth.indexOf(routePath) > -1;
    if (!user && !loggingIn && redirectIfNoAuth) browserHistory.push('/');
  }

  componentDidMount() {
    this.checkRedirect();
  }

  componentWillUpdate() {
    this.checkRedirect();
  }

  render() {
    const { user, routes, location, children, masterChannelData } = this.props;
    const containerChildren = routes[1];
    const childrenWithProps = React.cloneElement(children, {
      Container: containerChildren && containerChildren.container,
      ...this.props,
    });

    return (
      <div className="layout-wrapper">
        <Navbar authenticated={user} />
        <div className="container"> {childrenWithProps} </div>
        <Footer />
      </div>
    )
  }
};

function mapper(props, onData) {
  onData(null, {
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  });
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading master data"/>,
})(MasterLayout);
