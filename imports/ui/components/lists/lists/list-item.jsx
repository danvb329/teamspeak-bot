import React from 'react';
import Button from '/imports/ui/components/core/forms/button';

const ListItem = (props) => (
  <li className="pure-menu-item list-item">
    <p><strong>{props.listName}</strong></p>
    <div className="buttons-controls">
      <Button
        type="button"
        title="Edit"
        name="editList"
        buttonText="Edit"
        onClick={() => {
          props.editList(props.listId)
        }}
      />
      <Button
        type="button"
        title="Remove"
        name="removeList"
        buttonText="Remove"
        onClick={() => {
          props.deleteList(props.listId)
        }}
      />
    </div>

  </li>
)

export default ListItem;
