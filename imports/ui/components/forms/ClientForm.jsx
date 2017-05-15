import _ from 'lodash';
import React from 'react';
import SubmitUtils from '/imports/ui/utils/forms';
import FormLabel from '/imports/ui/components/forms/components/FormLabel';
import FormInput from '/imports/ui/components/forms/components/FormInput';
import FormErrors from '/imports/ui/components/forms/components/FormErrors';
import FormSubmitControls from '/imports/ui/components/forms/components/FromSubmitControls';

class NewClientForm extends React.Component {
  constructor(props) {
    super(props);

    const { client } = this.props;

    this.state = {
      change: false,
      hostname: undefined,
      hostnamePort: undefined,
      serverQueryPort: undefined,
      serverQueryHostname: undefined,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e, fieldname) {
    this.setState({
      change: true,
      [fieldname]: e.target.value
    });
  }

  render() {
    const { errors, client, onSubmit, onCancel, submitText } = this.props;
    const { change, hostname, hostnamePort, serverQueryHostname, serverQueryPort } = this.state;

    // Since we are not using any kind of react package for the forms,
    // and we are re-using this form for update - create this control what data
    // we sent to the server
    const formData = change ? _.assign({}, {
      hostname,
      hostnamePort,
      serverQueryPort,
      serverQueryHostname,
    }) : client;

    return (
      <div className="newclient-container">
        <form onSubmit={SubmitUtils.submit(onSubmit, formData)}>
          <div className="field">
            <FormLabel text="Hostname (i.e vip2.ts3shield.com)"/>
            <p className="control">
              <FormInput
                type="text"
                value={hostname || client && client.hostname }
                className="input"
                placeholder="Hostname (Server Query hostname)"
                onChange={(e) => this.onInputChange(e, 'hostname')}
              />
            </p>
          </div>
          <div className="field">
            <FormLabel text="Hostname PORT (i.e 30176)"/>
            <p className="control">
              <FormInput
                type="text"
                value={hostnamePort || client && client.hostnamePort}
                className="input"
                placeholder="Port"
                onChange={(e) => this.onInputChange(e, 'hostnamePort')}
              />
            </p>
          </div>
          <div className="field">
            <FormLabel text="ServerQuery hostname (will use Hostname if empty)"/>
            <p className="control">
              <FormInput
                type="text"
                value={serverQueryHostname || client && client.serverQueryHostname}
                className="input"
                placeholder="Hostname (ServerQuery hostname)"
                onChange={(e) => this.onInputChange(e, 'serverQueryHostname')}
              />
            </p>
          </div>
          <div className="field">
            <FormLabel text="ServerQuery port (default to 10011)"/>
            <p className="control">
              <FormInput
                type="text"
                value={serverQueryPort || client && client.serverQueryPort}
                className="input"
                placeholder="ServerQuery PORT (ServerQuery PORT)"
                onChange={(e) => this.onInputChange(e, 'serverQueryPort')}
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

export default NewClientForm;
