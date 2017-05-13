import React from 'react';
import { compose } from 'react-komposer';
import Footer from '/imports/ui/components/shared/Footer';
import Loader from '/imports/ui/components/shared/Loader';
import Navbar from '/imports/ui/components/shared/Navbar';
import trackerComposer from '/imports/ui/composers/tracker';

class MasterLayout extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { user, children, masterChannelData } = this.props;
    const childrenWithProps = React.cloneElement(children, {
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
  });
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading master data"/>,
})(MasterLayout);
