import React from 'react';
import { compose } from 'react-komposer';
import trackerComposer from '/imports/ui/composers/tracker';
import Loader from '/imports/ui/components/shared/loader.jsx';
import MasterChannel from '/imports/api/collections/master-channel';
import ChannelConfigurationPage from '/imports/ui/pages/configuration/channels-configuration';

class MasterLayout extends React.Component {
  render() {
    const { masterChannelData } = this.props;
    return (
      <div className="layout-wrapper">
        {
          masterChannelData ?
          this.props.children :
          <div>
            <ChannelConfigurationPage />
          </div>
        }

      </div>
    )
  }
};

function mapper(props, onData) {
  const serverMasterHandle = Meteor.subscribe('serverMaster');
  if (serverMasterHandle.ready()) {
    onData(null, {
      masterChannelData: MasterChannel.find().count() === 5,
    });
  };
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading master data"/>,
})(MasterLayout);
