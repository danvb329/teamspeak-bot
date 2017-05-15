import _ from 'lodash';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import validations from '/imports/ui/utils/validations';
import { insertServerQueryUser } from '/imports/api/server-query/methods';
import NewServerQueryUserForm from '/imports/ui/components/forms/NewServerQueryUserForm';

class NewServerQueryUserContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(formData) {
    const { params } = this.props;
    const dataWithRules = validations.applyRules({ data: formData, type: 'serverQueryUser' });
    const formDataEvaluated = validations.validate(dataWithRules);
    const clientId = params.clientId;
    this.setState({ errors: formDataEvaluated.errors });
    if (formDataEvaluated.haveErrors) return;
    _.assign(formDataEvaluated.formData, { clientId });
    insertServerQueryUser.call(formDataEvaluated.formData, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert('ServerQuery User Added', 'success', 'fixed-top', 'fa-check');
        browserHistory.push(`/clients/${clientId}/server/query`);
      }
    });
  }
  onCancel() {
    const { params } = this.props;
    browserHistory.push(`/clients/${params.clientId}/server/query`);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <article className="message is-info">
          <div className="message-header">
            <p>README</p>
          </div>
          <div className="message-body">
            This could be the core part of this BOT, you should be aware about what its the ServerQuery, if its ON and running and how to get users, Check our <Link>FAQ</Link> page to get a better guidance
          </div>
        </article>
        <div>
          <NewServerQueryUserForm
            errors={errors}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            submitText="Add ServerQuery User"
          />
        </div>
      </div>
    )
  }
};

export default NewServerQueryUserContainer;
