import React from 'react';
import AddItemForm from './add-item-form';
import Input from '/imports/ui/components/core/forms/input';
import Button from '/imports/ui/components/core/forms/button';

class EditItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item.name
    };
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
  }

  handleItemNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const {
      cancelEdit,
      updateItem,
      value,
      item,
      itemId,
    } = this.props;

    const { name } = this.state;
    return (
      <div>
        <AddItemForm
          item={item}
          name={name}
          handleItemNameChange={this.handleItemNameChange}
          onSubmit={(data) => updateItem({ itemId, data })}
        />
        <Button
          type="button"
          title="Cancel"
          name="editITem"
          buttonText="Cancel"
          onClick={cancelEdit}
          className="pure-button pure-button-primary full-button"
        />
      </div>
    )
  }
}

export default EditItemForm;
