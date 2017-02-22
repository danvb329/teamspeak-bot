import React from 'react';
import { compose } from 'react-komposer';
import List from '/imports/ui/components/channels/list';
import trackerComposer from '/imports/ui/composers/tracker';
import Loader from '/imports/ui/components/shared/loader.jsx';

class DragChannelsContainer extends React.Component {
  dragToChannel(cid) {
    Meteor.call('dragToChannel', cid);
  }

  deleteChannel(cid) {
    Meteor.call('deleteChannel', cid);
  }

  render() {
    const { channels } = this.props;
    return (
      <div className="channels-drag-container">
        <List
          channels={channels}
          dragToChannel={this.dragToChannel}
          deleteChannel={this.deleteChannel}
        />
      </div>
    )
  }
};

function mapper(props, onData) {
  Meteor.call('getAllChannels', function(error, result) {
    if (error) {
      onData(error, null);
    } else {
      onData(null, {
        channels: result
      })
    }
  })
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading channels"/>,
})(DragChannelsContainer);
