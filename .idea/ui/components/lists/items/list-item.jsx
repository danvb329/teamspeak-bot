import React from 'react';
import Button from '/imports/ui/components/core/forms/button';
import EditItemForm from './edit-item-form';

const ListItem = (props) => (
  <li className="pure-menu-item list-item">
    {
      (props.itemToEditId === props.itemId)
       ? <div>
         <EditItemForm
           value={props.name}
           itemId={props.itemId}
           item={props.item}
           cancelEdit={props.cancelEdit}
           updateItem={props.updateItem}
         />
       </div>
       :
       <div className="list-item-wrapper">
         <p><strong>{props.name}</strong></p>
         <div className="buttons-controls">
           <Button
             type="button"
             title="Edit Item"
             name="editItem"
             buttonText="Edit Item"
             onClick={() => {
               props.editItem(props.itemId)
             }}
           />
           <Button
             type="button"
             title="Delete Item"
             name="deleteItem"
             buttonText="Delete Item"
             onClick={() => {
               props.deleteItem(props.itemId)
             }}
           />
         </div>
       </div>
     }
  </li>
)

export default ListItem;
