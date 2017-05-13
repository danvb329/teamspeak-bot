import React from 'react';
import { compose } from 'react-komposer';
import Loader from '/imports/ui/components/shared/loader';
import Navbar from '/imports/ui/components/shared/navbar';
import trackerComposer from '/imports/ui/composers/tracker';

class MasterLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false };

    this.checkAuth = this.checkAuth.bind(this);
  }

  checkAuth() {
    const { user } = this;
    let authenticated = false;
    if ((user || Meteor.loggingIn())) authenticated = true;
    this.setState({ authenticated });
  }

  componentWillMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  render() {
    const { authenticated } = this.state;
    const { children, masterChannelData } = this.props;
    const childrenWithProps = React.cloneElement(children, {
      ...this.props,
    });

    return (
      <div className="layout-wrapper">
        <Navbar authenticated={authenticated} />
        {childrenWithProps}
      </div>
    )
  }
};

function mapper(props, onData) {
  onData(null, {
    user: Meteor.user(),
  });
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading master data"/>,
})(MasterLayout);
