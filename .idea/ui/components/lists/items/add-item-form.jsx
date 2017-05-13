import React from 'react';
import Input from '/imports/ui/components/core/forms/input';
import CheckboxOrRadio from '/imports/ui/components/core/forms/checkboxOrRadio';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    if (props.item) {
      itemProps = Object.assign({}, props.item, {
        pokeIfOnlineOption: [
          props.item.pokeIfOnline ? 'yes' : 'no'
        ],
        pokeIfDieOption: [
          props.item.pokeIfDie ? 'yes' : 'no'
        ],
        pokeIfLevelUpOption: [
          props.item.pokeIfLevelUp ? 'yes' : 'no'
        ],
        isImportantOption: [
          props.item.isImportant ? 'yes' : 'no'
        ],
      })
    } else {
      itemProps = {
        pokeIfOnline: true,
        pokeIfDie: true,
        pokeIfLevelUp: true,
        isImportant: true,
        pokeIfOnlineOption: ['no'],
        pokeIfDieOption: ['no'],
        pokeIfLevelUpOption: ['no'],
        isImportantOption: ['no'],
      };
    }

    this.state = itemProps;

    this.handlePokeIfOnlineChange = this.handlePokeIfOnlineChange.bind(this);
    this.handlePokeIfDieChange = this.handlePokeIfDieChange.bind(this);
    this.handleIsImportantChange = this.handleIsImportantChange.bind(this);
    this.handlePokeIfLevelUp = this.handlePokeIfLevelUp.bind(this);
  }

  handlePokeIfOnlineChange(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;
    this.setState({
      pokeIfOnlineOption: newSelection === 'yes' ? ['yes'] : ['no'],
      pokeIfOnline: newSelection === 'yes' ? true : false
    });
  }

  handleIsImportantChange(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;
    this.setState({
      isImportantOption: newSelection === 'yes' ? ['yes'] : ['no'],
      isImportant: newSelection === 'yes' ? true : false
    });
  }

  handlePokeIfDieChange(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;
    this.setState({
      pokeIfDieOption: newSelection === 'yes' ? ['yes'] : ['no'],
      pokeIfDie: newSelection === 'yes' ? true : false
    });
  }

  handlePokeIfLevelUp(e) {
    const { selectedListType } = this.state;
    const newSelection = e.target.value;
    this.setState({
      pokeIfLevelUpOption: newSelection === 'yes' ? ['yes'] : ['no'],
      pokeIfLevelUp: newSelection === 'yes' ? true : false
    });
  }

  render() {
    const {
      pokeIfOnlineOption,
      isImportantOption,
      pokeIfDieOption,
      pokeIfLevelUpOption,
      pokeIfLevelUp,
      pokeIfOnline,
      pokeIfDie,
      isImportant,
    } = this.state;
    const { onSubmit, handleItemNameChange, name } = this.props;
    return (
    <div className="add-item">
      <form className="pure-form pure-form-stacked add-item--form" onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          pokeIfOnline,
          pokeIfDie,
          isImportant,
          pokeIfLevelUp,
        });
      }} >
      <fieldset>
        <legend>Add a Character Manually By Name</legend>
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-1-1">
            <Input
              className="pure-input-1"
              name="Item Name"
              type="text"
              value={name}
              onChange={handleItemNameChange}
              placeholder="Item Name"
            />
          </div>
          <div className="pure-u-md-1-4">
            <CheckboxOrRadio
              title="Poke if Online"
              setName="pokeIfOnline"
              type="checkbox"
              onChange={this.handlePokeIfOnlineChange}
              options={['yes', 'no']}
              selectedOptions={pokeIfOnlineOption}
            />
          </div>
          <div className="pure-u-md-1-4">
            <CheckboxOrRadio
              title="Poke if die"
              setName="pokeIfDie"
              type="checkbox"
              onChange={this.handlePokeIfDieChange}
              options={['yes', 'no']}
              selectedOptions={pokeIfDieOption}
            />
          </div>
          <div className="pure-u-md-1-4">
            <CheckboxOrRadio
              title="Is important?"
              setName="isImportant"
              type="checkbox"
              onChange={this.handleIsImportantChange}
              options={['yes', 'no']}
              selectedOptions={isImportantOption}
            />
          </div>
          <div className="pure-u-md-1-1">
            <Input
              type="submit"
              className="pure-button pure-button-primary full-button"
            />
          </div>
        </div>
      </fieldset>
     </form>
    </div>
    )
  }
}

export default AddItemForm;
