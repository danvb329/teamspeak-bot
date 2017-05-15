import React from 'react';
import { render } from 'react-dom';
import 'react-table/react-table.css';
import { Meteor } from 'meteor/meteor';
import Routes from './routing';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('root'));
});
