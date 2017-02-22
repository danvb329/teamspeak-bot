import React from 'react'
import Input from '/imports/ui/components/core/forms/input';
import CheckboxOrRadio from '/imports/ui/components/core/forms/checkboxOrRadio';

class CreateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: '',
      selectedListType: ['enemys'],
      listType: 'enemys',
      selectionOfflineOption: ['no'],
      showOffline: true,
      numberOfImportants: 0,
    };

    this.handleListChange = this.handleListChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleOfflineCheckboxChange = this.handleOfflineCheckboxChange.bind(this);
    this.handleNumberOfImportantsChange = this.handleNumberOfImportantsChange.bind(this);
  }

  handleListChange(e) {
    this.setState({ listName: e.target.value });
  }

  handleNumberOfImportantsChange(e) {
    this.setState({ numberOfImportants: e.target.value });
  }

  handleOfflineCheckboxChange(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;
    this.setState({
      selectionOfflineOption: newSelection === 'yes' ? ['yes'] : ['no'],
      showOffline: newSelection === 'yes' ? true : false
    });
  }

  handleCheckBoxChange(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;

    this.setState({
      selectedListType: [newSelection],
      listType: newSelection
    });
  }

  render() {
    const {
      listName,
      selectedListType,
      selectionOfflineOption,
      listType,
      showOffline,
      numberOfImportants
    } = this.state;
    const { onSubmit } = this.props;

    return (
      <div className="create-list-container">
        <form className="pure-form pure-form-aligned create-list-form" onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ listName, listType, showOffline, numberOfImportants });
        }} >
        <fieldset>
          <legend>Create Your Bot Lists (channels)</legend>
          <div className="pure-control-group">
            <Input
              className="pure-input-1"
              id="listName"
              name="List Name"
              type="text"
              value={listName}
              onChange={this.handleListChange}
              placeholder="List Name"
            />
          </div>
          <div className="pure-control-group">
            <CheckboxOrRadio
              title="Enemy or Friend"
              setName="enemys"
              type="checkbox"
              onChange={this.handleCheckBoxChange}
              options={['enemys', 'friends']}
              selectedOptions={selectedListType}
            />
          </div>
          <div className="pure-control-group">
            <CheckboxOrRadio
              title="Show Offline"
              setName="enemys"
              type="checkbox"
              onChange={this.handleOfflineCheckboxChange}
              options={['yes', 'no']}
              selectedOptions={selectionOfflineOption}
            />
          </div>
          {/* <div className="pure-control-group">
            <Input
              title="This option will let you decide how much importants should be online to ping the TS"
              id="numberOfImportants"
              className="pure-input-1-4"
              name="Important Enemy"
              type="text"
              value={numberOfImportants}
              onChange={this.handleNumberOfImportantsChange}
              placeholder="Number Of Importants"
            />
          </div> */}
          <Input
            type="submit"
          />
        </fieldset>
        </form>
      </div>
    )
  }
};

export default CreateList;
