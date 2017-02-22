import React from 'react';
import ListItem from './list-item';

const List = (props) => (
  <ul className="pure-menu-list lists">
    {props.items.map((item) => {
      return <ListItem
        name={name}
        item={item}
        itemId={item._id}
        itemToEditId={props.itemToEditId}
        editItem={props.editItem}
        cancelEdit={props.cancelEdit}
        cancelEditItem={props.cancelEditItem}
        deleteItem={props.deleteItem}
        updateItem={props.updateItem}
        name={item.name}
        key={item._id}
      />
    })}
  </ul>
);

export default List;
