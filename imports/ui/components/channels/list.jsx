import React from 'react';
import Item from './item';

class List extends React.Component {
  render() {
    const {
      createChanels,
      channels,
      dragToChannel,
      deleteChannel,
    } = this.props;
    return (
      <div>
        <ul className="pure-menu-list">
          {channels.map((channel) => {
            return <Item
              key={channel.cid}
              dragToChannel={dragToChannel}
              deleteChannel={deleteChannel}
              createChanels={createChanels}
              channel={channel}
            />
          })}
        </ul>
      </div>
    )
  }
};

export default List;
