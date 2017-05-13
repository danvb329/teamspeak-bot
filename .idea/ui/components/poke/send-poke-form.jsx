import React from 'react';
import Input from '/imports/ui/components/core/forms/input';

class SendPokeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: props.value
    };

    this.handlePokeMessageChange = this.handlePokeMessageChange.bind(this);
  }

  handlePokeMessageChange(e) {
    this.setState({ msg: e.target.value });
  }

  render() {
    const { onSubmit } = this.props;
    const { msg } = this.state;
    return (
      <div className="aligner-margin-top">
        <div className="aligner-item">
          <form className="pure-form" onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ msg });
          }} >
          <h1 className="home-item big-title">SEND MASS POKE</h1>
            <Input
              name="Poke Message"
              type="text"
              value={msg}
              onChange={this.handlePokeMessageChange}
              placeholder="Poke Message"
            />
            <Input
              name="Send Poke"
              title="Send Poke"
              type="submit"
            />
          </form>
        </div>
      </div>
    )
  }
};

export default SendPokeForm;
