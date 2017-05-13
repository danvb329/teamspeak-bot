import React from 'react'
import { compose } from 'react-komposer';
import trackerComposer from '/imports/ui/composers/tracker';
import ListsItems from '/imports/api/collections/list-items';
import Loader from '/imports/ui/components/shared/loader.jsx';
import ListItemsControls from '/imports/ui/components/lists/items/list-items-controls';


class ListItemsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { itemToEditId : null };

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItemsByGuildUrl = this.addItemsByGuildUrl.bind(this);
  }

  editItem(itemId) {
    this.setState({
      itemToEditId: itemId
    });
  }

  cancelEdit() {
    this.setState({
      itemToEditId: null
    });
  }

  updateItem(item) {
    Meteor.call('updateListItem', item, (error, result) => {
      if (error) console.log(error);
      this.setState({
        itemToEditId: null
      });
    })
  }

  addItem(item) {
    const { listId } = this.props;
    if (!item.name) {
      console.warn('Item Name is missing');
      return;
    };
    Meteor.call('insertListItem', Object.assign({}, item, { listId }));
  }

  deleteItem(_id) {
    Meteor.call('deleteListItem', { _id }, (error, result) => {
      if (error) console.log(error);
      console.log(result);
    })
  };

  addItemsByGuildUrl({ guildURL }) {
    const { listId } = this.props;
    Meteor.call('insertItemsByUrl', { guildURL, listId }, (error, result) => {
      if (error) console.log(error);
      console.log(result);
    })
  }

  render() {
    const { items } = this.props;
    const { itemToEditId } = this.state;

    return (
      <div>
        <ListItemsControls
          items={items}
          itemToEditId={itemToEditId}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem}
          cancelEdit={this.cancelEdit}
          onSubmit={this.addItem}
          onSubmitGuildUrl={this.addItemsByGuildUrl}
        />
      </div>
    )
  }
};

function mapper({ listId } = {}, onData) {
  const itemsHandler = Meteor.subscribe('getListItemsById', listId);
  if (itemsHandler.ready()) {
    onData(null, {
      items: ListsItems.find().fetch(),
    });
  };
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading items"/>,
})(ListItemsContainer);
