import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Routes from './routing';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('root'));
});
