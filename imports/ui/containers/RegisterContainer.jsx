import React from 'react';
import { browserHistory } from 'react-router';
import validations from '/imports/ui/utils/validations';
import RegisterForm from '/imports/ui/components/forms/RegisterForm';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    const dataWithRules = validations.applyRules({ data: formData, type: 'registerForm' });
    const formDataEvaluated = validations.validate(dataWithRules);
    this.setState({ errors: formDataEvaluated.errors });
    if (formDataEvaluated.haveErrors) return;
    Accounts.createUser(formDataEvaluated.formData, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert('Account Created', 'success', 'fixed-top', 'fa-check');
        browserHistory.push('/');
      }
    });
  }

  onCancel() {
    browserHistory.push('/');
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <RegisterForm
          errors={errors}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
};

export default RegisterContainer;
