import _ from 'lodash';
import React from 'react';
import { browserHistory } from 'react-router';
import validations from '/imports/ui/utils/validations';
import { updateClient } from '/imports/api/clients/methods';
import ClientForm from '/imports/ui/components/forms/ClientForm';

class UpdateClientContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    const { client } = this.props;
    const dataWithRules = validations.applyRules({ data: formData, type: 'clientForm' });
    const formDataEvaluated = validations.validate(dataWithRules);
    this.setState({ errors: formDataEvaluated.errors });
    if (formDataEvaluated.haveErrors) return;
    updateClient.call(_.assign(formDataEvaluated.formData, {
      _id: client._id,
    }), (error, result) => {
      if (error) {
        console.log(error);
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert(`${formDataEvaluated.formData.hostname} Updated!`, 'success', 'fixed-top', 'fa-check');
      }
    });
  }

  onCancel() {}

  render() {
    const { errors } = this.state;
    const { client } = this.props;

    return (
      <div className="new-client-container--wrapper">
        <ClientForm
          client={client}
          errors={errors}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          submitText="Update Client"
        />
      </div>
    )
  }
};

export default UpdateClientContainer;
