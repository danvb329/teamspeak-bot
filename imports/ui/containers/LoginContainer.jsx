import React from 'react';
import { browserHistory } from 'react-router';
import validations from '/imports/ui/utils/validations';
import LoginForm from '/imports/ui/components/forms/LoginForm';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    const dataWithRules = validations.applyRules({ data: formData, type: 'loginForm' });
    const formDataEvaluated = validations.validate(dataWithRules);
    this.setState({ errors: formDataEvaluated.errors });
    if (formDataEvaluated.haveErrors) return;
    Meteor.loginWithPassword(formDataEvaluated.formData.email, formDataEvaluated.formData.password, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert('Welcome Back', 'success', 'fixed-top', 'fa-check');
        browserHistory.push('/client/new');
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
        <LoginForm
          errors={errors}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
};

export default RegisterContainer;
