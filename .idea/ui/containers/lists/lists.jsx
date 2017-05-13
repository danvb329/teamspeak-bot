import React from 'react'
import { compose } from 'react-komposer';
import { browserHistory } from 'react-router';
import Lists from '/imports/api/collections/lists';
import trackerComposer from '/imports/ui/composers/tracker';
import Loader from '/imports/ui/components/shared/loader.jsx';
import List from '/imports/ui/components/lists/lists/list';


class ListsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteList(_id) {
    Meteor.call('removeList', { _id }, (error, result) => {
      if (error) console.log(error);
      console.log(result);
    })
  }

  editList(listId) {
    browserHistory.push(`/list/${listId}`);
  }

  render() {
    const { lists } = this.props;
    return (
      <div>
        <List
          lists={lists}
          deleteList={this.deleteList}
          editList={this.editList}
        />
      </div>
    )
  }
};

function mapper(props, onData) {
  const listsHandler = Meteor.subscribe('getAllLists');
  if (listsHandler.ready()) {
    onData(null, {
      lists: Lists.find().fetch(),
    });
  };
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading lists"/>,
})(ListsContainer);
