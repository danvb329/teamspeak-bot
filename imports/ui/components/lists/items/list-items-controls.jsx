import React from 'react'
import AddItemForm from './add-item-form';
import AddItemsByGuild from './add-items-by-guild';
import List from '/imports/ui/components/lists/items/list';

class ListItemsControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.handleItemNameChange = this.handleItemNameChange.bind(this);
  }

  handleItemNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const {
      onSubmit,
      items,
      editItem,
      itemToEditId,
      cancelEdit,
      updateItem,
      deleteItem,
      onSubmitGuildUrl,
    } = this.props;
    const { name } = this.state;

    return (
      <div className="pure-g">
        <div className="pure-u-24-24">
          <AddItemsByGuild onSubmit={onSubmitGuildUrl}/>
        </div>
        <div className="pure-u-24-24">
          <AddItemForm
            onSubmit={onSubmit}
            name={name}
            handleItemNameChange={this.handleItemNameChange}
          />
        </div>
        <div className="pure-u-24-24">
          <div className="aligner-no-padding">
            <div className="aligner-item list-container">
              <h1>Current Characters</h1>
              <List
                name={name}
                items={items}
                editItem={editItem}
                itemToEditId={itemToEditId}
                cancelEdit={cancelEdit}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            </div>
          </div>
       </div>
      </div>
    )
  }
};

export default ListItemsControls;
