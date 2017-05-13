import React from 'react'
import { browserHistory } from 'react-router';

import CreateListComponent from '/imports/ui/components/lists/lists/create-list';

class CreateListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  addList(list) {
    if (!list.listName) {
      console.warn('List Name is missing');
      return;
    };

    Meteor.call('createList', list, (error, result) => {
      if (error) console.log(error);
      browserHistory.push(`/list/${result}`);
    })
  }

  render() {
    return (
      <div>
        <CreateListComponent
          onSubmit={this.addList}
        />
      </div>
    )
  }
};

export default CreateListContainer;
