import React from 'react';
import Input from '/imports/ui/components/core/forms/input';
import CheckboxOrRadio from '/imports/ui/components/core/forms/checkboxOrRadio';

class AddItemsByGuild extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guildURL: '',
    };

    this.handleGuildUrlChange = this.handleGuildUrlChange.bind(this);
  }

  handleGuildUrlChange(e) {
    const guildURL = e.target.value;
    this.setState({ guildURL });
  }

  render() {
    const { guildURL } = this.state;
    const { onSubmit } = this.props;
    return (
      <div className="add-item-by-guild">
        <form className="pure-form add-item-by-guild--form" onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ guildURL });
        }} >
        <fieldset>
          <legend>Add Item by Giving URL (Medivia ATM)</legend>
          <Input
            className="pure-input-1"
            name="Guild URL"
            type="text"
            value={guildURL}
            onChange={this.handleGuildUrlChange}
            placeholder="Guild URL"
          />
          <div className="pure-controls">
            <Input
              type="submit"
            />
          </div>
        </fieldset>
        </form>
      </div>
    )
  }
}

export default AddItemsByGuild;
