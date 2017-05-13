import React from 'react';
import List from '/imports/ui/components/channels/list';
import Input from '/imports/ui/components/core/forms/input';

class CreateBotChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };

    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  handleOrderChange(e) {
    this.setState({ order: e.target.value });
  }

  render() {
    const { createChanels, channels } = this.props;
    const { order }  = this.state;
    return(
      <div>
        <div className="aligner">
          <span>Start point for the bot</span>
          <div className="aligner-item">
            <div className="channels-drag-container">
              <List
                channels={channels}
                createChanels={createChanels}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default CreateBotChannels;
