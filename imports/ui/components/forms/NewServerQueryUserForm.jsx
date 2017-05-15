import React from 'react';
import SubmitUtils from '/imports/ui/utils/forms';
import FormLabel from '/imports/ui/components/forms/components/FormLabel';
import FormInput from '/imports/ui/components/forms/components/FormInput';
import FormErrors from '/imports/ui/components/forms/components/FormErrors';
import FormSubmitControls from '/imports/ui/components/forms/components/FromSubmitControls';

class NewServerQueryUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e, fieldname) {
    this.setState({ [fieldname]: e.target.value });
  }

  render() {
    const { errors, onSubmit, submitText, onCancel } = this.props;
    const formData = this.state;
    return (
      <div className="serverquert-user-container">
        <form onSubmit={SubmitUtils.submit(onSubmit, formData)}>
          <div className="field">
            <FormLabel text="Username"/>
            <p className="control">
              <FormInput
                type="text"
                className="input"
                placeholder="username"
                onChange={(e) => this.onInputChange(e, 'username')}
              />
            </p>
          </div>
          <div className="field">
            <FormLabel text="Password"/>
            <p className="control">
              <FormInput
                type="password"
                className="input"
                placeholder="Password"
                onChange={(e) => this.onInputChange(e, 'password')}
              />
            </p>
          </div>
          <div className="field">
            <FormErrors errors={errors} />
          </div>
          <FormSubmitControls
            onCancel={onCancel}
            submitText={submitText}
            cancelText="cancel"
          />
        </form>
      </div>
    )
  }
};

export default NewServerQueryUserForm;
