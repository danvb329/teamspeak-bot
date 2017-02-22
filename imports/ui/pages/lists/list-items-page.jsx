import React from 'react';
import ListItemsContainer from '/imports/ui/containers/lists/list-items';

class ListItemsPage extends React.Component {
  render() {
    const { params } = this.props;
    return (
      <div>
        <ListItemsContainer listId={params.listId} />
      </div>
    )
  }
}

export default ListItemsPage;
