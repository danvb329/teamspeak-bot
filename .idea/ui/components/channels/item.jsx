import React from 'react';
import Button from '/imports/ui/components/core/forms/button';

class Item extends React.Component {
  render() {
    const { channel, dragToChannel, deleteChannel, createChanels } = this.props;
    return (
      <li className="pure-menu-item list-item">
        <p><strong>{channel.channel_name}</strong></p>
        <div className="buttons-controls">
          {
            dragToChannel ?
            <Button
              type="button"
              title="Drag ALL"
              name="dragAll"
              buttonText="Drag ALL"
              onClick={() => {
                dragToChannel(channel.cid)
              }}
            /> :
            null
          }
        {
          deleteChannel ?
          <Button
            type="button"
            title="Delete Channel"
            name="deleteChannel"
            buttonText="Delete Channel"
            onClick={() => {
              deleteChannel(channel.cid)
            }}
          /> :
          null
        }
        {
          createChanels ?
          <Button
            type="button"
            title="Create From here"
            name="createFromHere"
            buttonText="Create from here"
            onClick={() => {
              createChanels(channel.channel_order)
            }}
          /> :
          null
        }
      </div>
      </li>
    )
  }
};

export default Item;
