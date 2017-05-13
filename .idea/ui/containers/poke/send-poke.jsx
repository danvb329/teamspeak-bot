import React from 'react';
import SendPokeForm from '/imports/ui/components/poke/send-poke-form';

class SendPokeContainer extends React.Component {
  sendPoke(msg) {
    Meteor.call('pokeClient', msg);
  }

  render() {
    return (
      <div>
        <SendPokeForm
          onSubmit={this.sendPoke}
        />
      </div>
    )
  }
};

export default SendPokeContainer;
