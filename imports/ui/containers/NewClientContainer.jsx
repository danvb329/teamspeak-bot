import React from 'react';
import { browserHistory } from 'react-router';
import validations from '/imports/ui/utils/validations';
import { insertClient } from '/imports/api/clients/methods';
import ClientForm from '/imports/ui/components/forms/ClientForm';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    const dataWithRules = validations.applyRules({ data: formData, type: 'clientForm' });
    const formDataEvaluated = validations.validate(dataWithRules);
    this.setState({ errors: formDataEvaluated.errors });
    if (formDataEvaluated.haveErrors) return;
    insertClient.call(formDataEvaluated.formData, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert(`${formDataEvaluated.formData.hostname} Added!`, 'success', 'fixed-top', 'fa-check');
      }
    });
  }

  onCancel() {}

  render() {
    const { errors } = this.state;
    return (
      <div className="new-client-container--wrapper">
        <ClientForm
          errors={errors}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          submitText="Create Client"
        />
      </div>
    )
  }
};

export default RegisterContainer;
