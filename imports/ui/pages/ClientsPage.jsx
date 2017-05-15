import React from 'react';
import { browserHistory } from 'react-router';
import Menu from '/imports/ui/components/shared/Menu';

class ClientsPage extends React.Component {
  render() {
    const { clients, location, Container } = this.props;

    return (
      <div className="clients-page--wrapper">
        <Menu pathName={location.pathname} clients={clients}/>
        <div className="clients-page--content">
          <h3 className="title is-3 clients-page--title">Clients Page</h3>
          <Container {...this.props} />
        </div>
      </div>
    )
  }
};

export default ClientsPage;
