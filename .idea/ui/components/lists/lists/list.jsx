import React from 'react';
import ListItem from './list-item';

const List = (props) => (
  <ul className="pure-menu-list lists">
    {props.lists.map((list) => {
      return <ListItem
        listId={list._id}
        editList={props.editList}
        deleteList={props.deleteList}
        listName={list.listName}
        key={list._id}
      />
    })}
  </ul>
);

export default List;
