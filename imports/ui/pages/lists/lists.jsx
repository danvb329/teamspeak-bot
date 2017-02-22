import React from 'react';
import { Link, browserHistory } from 'react-router';
import Button from '/imports/ui/components/core/forms/button';
import ListsContainer from '/imports/ui/containers/lists/lists';

class ListsPage extends React.Component {
  redirectToNewListPage() {
    browserHistory.push(`/list/create`);
  }
  render() {
    return (
      <div className="aligner">
        <div className="aligner-item aligner-item--top">
          <Button
            type="button"
            iconName="edit"
            title="create new list"
            buttonText="Create a new list"
            name="createList"
            onClick={this.redirectToNewListPage}
          />
        </div>
        <div className="aligner-item list-container">
          <ListsContainer />
        </div>
      </div>
    )
  }
}

export default ListsPage;
