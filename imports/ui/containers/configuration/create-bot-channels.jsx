import React from 'react';
import { compose } from 'react-komposer';
import trackerComposer from '/imports/ui/composers/tracker';
import Loader from '/imports/ui/components/shared/loader.jsx';
import CreateBotChannelsForm from '/imports/ui/components/configuration/create-bot-channels-form';

class CreateBotChannels extends React.Component {
  createChanels(order) {
    Meteor.call('createBotChannels', order, (error, result) => {
      if (error) return error;
      console.log(result);
    })
  }

  render() {
    const { channels } = this.props;
    return(
      <div>
        <CreateBotChannelsForm
          channels={channels}
          createChanels={this.createChanels}
        />
      </div>
    )
  }
};

function mapper(props, onData) {
  Meteor.call('getAllChannels', function(error, result) {
    if (error) {
      console.log(error);
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
})(CreateBotChannels);
