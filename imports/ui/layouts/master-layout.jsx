import React from 'react';
import { compose } from 'react-komposer';
import Loader from '/imports/ui/components/shared/loader';
import trackerComposer from '/imports/ui/composers/tracker';

class MasterLayout extends React.Component {
  render() {
    const { masterChannelData } = this.props;
    return (
      <div className="layout-wrapper">
        <h1>Hello</h1>
      </div>
    )
  }
};

function mapper(props, onData) {
  onData(null, {});
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading master data"/>,
})(MasterLayout);
